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

function Category() {

    const [open, setOpen] = useState(false)
    const [editMode, setEditMode] = useState(null);
    const [categories, setCategories] = useState([]);


    const fetchcategories = async () => {
        const response = await axios.get('http://localhost:8080/api/category/allcategories')
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
        '&:hover': {
            backgroundColor: theme.palette.primary.darker,
            cursor: 'pointer',
        },
        '&:focus': {
            boxShadow: 'none',
        },
    }));

    const handleSave = () => {

    }
    const handleEdit = (id) => {
        setEditMode(id)

    }
    const handleDelete = async (id) => {
        const confirmed = window.confirm('Delete the category?');
        if (confirmed) {
            const response = await axios.delete(`http://localhost:8080/api/category/delete/${id}`);
            if (response.status === 200) {
                fetchcategories();
                
            } else {
                alert('Category not deleted');
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
                                                    <td>{item.cateName}</td>

                                                    <td>
                                                        <img src={`http://localhost:8080/api/images?imageName=rice1.jpg`} alt={item.cateName} style={{ width: '30px', height: '30px' }}
                                                        />
                                                    </td>
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
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                {open && <AddCategory open={open} handleClose={handleClose} fetchcategories={fetchcategories} />}
            </div>
        </div>
    );
}

export default Category;
