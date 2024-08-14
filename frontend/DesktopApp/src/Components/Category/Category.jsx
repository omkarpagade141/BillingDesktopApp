import React, { useEffect, useState } from 'react';
import { Table, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { styled } from '@mui/system';
import './Category.css'; // Make sure to create this CSS file or include the styles in your global CSS
import axios, { Axios } from 'axios';
import AddCategory from './AddCategory';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

function Category({ triggerMessage }) {

    const [open, setOpen] = useState(false)
    const [editMode, setEditMode] = useState(null);
    const [categories, setCategories] = useState([]);
    const [updatedCatName, setUpdatedCatName] = useState('')
    const [updatedCatImage, setUpdatedCatImage] = useState(null)


    const fetchcategories = async () => {
        const response = await axios.get('/myapi/api/category/allcategories')
        setCategories(response.data)
        console.log(response.data, '#############');
    }

    useEffect(() => {

        fetchcategories()

    }, [])

    const toggleCategoryForm = () => {
        setOpen(!open)
    }
    const handleClose = () => {
        setOpen(false)
    }

    const StyledButton = styled(Button)(({ theme }) => ({
        backgroundColor: theme.palette.primary.main,
        border: 'none',
        justifyContent: 'center',
        color: 'white',
        '&:hover': {
            backgroundColor: theme.palette.primary.darker,
            cursor: 'pointer',
        },
        '&:focus': {
            boxShadow: 'none',
        },
    }));

    const handleSave = async (id) => {
        const category = categories.find(cat => cat.cateId == id)
        let imageToSend = updatedCatImage;

        if (!imageToSend) {
            const imageResponse = await axios.get(`/myapi/api/images?imageName=${category.cateImageUrl}`, { responseType: 'blob' });
            imageToSend = new File([imageResponse.data], category.cateImageUrl, { type: imageResponse.headers['content-type'] });
            const formData = new FormData();
            formData.append('cateName', updatedCatName || category.cateName);
            formData.append('imageName', imageToSend);
            const reponse = await axios.put(`/myapi/api/category/update/${id}`, formData)
            console.log(reponse, '@@@@@@@@@@@@@@@@@@');
            if (reponse.status === 200) {
                fetchcategories()
                setEditMode(null)
                triggerMessage('Category updated successfully', 'success')
            }

        } else {
            const formData = new FormData();
            formData.append('cateName', updatedCatName || category.cateName);
            formData.append('imageName', updatedCatImage);
            const reponse = await axios.put(`/myapi/api/category/update/${id}`, formData)
            console.log(reponse, '@@@@@@@@@@@@@@@@@@');
            if (reponse.status === 200) {
                fetchcategories()
                setEditMode(null)
                triggerMessage('Category updated successfully', 'success')
            }
        }


    }
    const handleEdit = (id) => {
        setEditMode(id)

    }
    const handleDelete = async (id) => {
        const confirmed = window.confirm('Delete the category?');
        if (confirmed) {
            const response = await axios.delete(`/myapi/api/category/delete/${id}`);
            if (response.status === 200) {
                fetchcategories();
                triggerMessage('Category deleted successfully', 'success');

            } else {
                triggerMessage('Category not deleted', 'error');
            }
        }
    }



    return (
        <div className='container-fixed'>
            <div className='content-wrapper'>
                <Row className='mt-5'>
                    <Col xs={10}>
                        <h3>All Category </h3>
                    </Col>
                    <Col xs={2}>
                        <StyledButton variant="contained" color="primary" onClick={toggleCategoryForm}>+ Add Category</StyledButton>
                    </Col>
                </Row>
                <Row>

                    <Col md={12}>
                        <Card className='mt-2 scrollable-card'>
                            <Card.Body>
                                <Card.Title className='text-center'>All Category List</Card.Title>
                                <div className='table-container'>
                                    {
                                        categories.length > 0 ?
                                            <>
                                                <Table striped bordered hover>
                                                    <thead>
                                                        <tr>
                                                            <th>ID</th>
                                                            <th>Name</th>

                                                            <th>Image</th>
                                                            <th>Action</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {categories.map(item => (
                                                            <tr key={item.cateId} className='TableRowInCategory'>
                                                                <td>{item.cateId}</td>
                                                                {editMode == item.cateId ?
                                                                    <td><input type="text" name="" id="" onChange={(e) => {
                                                                        setUpdatedCatName(e.target.value)
                                                                    }} defaultValue={item.cateName} /></td>
                                                                    : <td>{item.cateName}</td>
                                                                }


                                                                {
                                                                    editMode == item.cateId ?
                                                                        <td><input type="file" name="" id="" onChange={(e) => {
                                                                            setUpdatedCatImage(e.target.files[0])
                                                                        }} /></td>
                                                                        :
                                                                        <td>
                                                                            {/* /myapi/api/images?imageName=${item.cateImageUrl} */}
                                                                            <img src={`/myapi/api/images?imageName=${item.cateImageUrl}`} alt={item.cateName} style={{ width: '30px', height: '30px' }}
                                                                            />
                                                                        </td>

                                                                }

                                                                <td >
                                                                    {editMode === item.cateId ? (
                                                                        <IconButton className='IconButton' onClick={() => handleSave(item.cateId)}>
                                                                            <SaveIcon className="saveIcon" />
                                                                        </IconButton>
                                                                    ) : (
                                                                        <IconButton className='IconButton' onClick={() => handleEdit(item.cateId)}>
                                                                            <EditIcon className="editIcon" />
                                                                        </IconButton>
                                                                    )}
                                                                    <IconButton className='IconButton' onClick={() => handleDelete(item.cateId)}>
                                                                        <DeleteIcon className="deleteIcon" />
                                                                    </IconButton>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </> :
                                            <>
                                                <h2>No Category Found</h2>
                                            </>
                                    }

                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                {open && <AddCategory open={open} handleClose={handleClose} fetchcategories={fetchcategories} triggerMessage={triggerMessage} />}
            </div>
        </div>
    );
}

export default Category;
