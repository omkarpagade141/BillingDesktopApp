import React, { useEffect, useState } from 'react';
import { Table, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { styled } from '@mui/system';
import './Product.css';
import axios from 'axios';
import AddProduct from './AddProduct';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

function Products({ triggerMessage }) {

    const [open, setOpen] = useState(false)
    const [editMode, setEditMode] = useState(null);
    const [products, setproducts] = useState([]);
    const [updProdName, setUpdProdName] = useState('')
    const [updProdPrice, setUpdProdPrice] = useState('')
    const [updProdImage, setUpdProdImage] = useState(null)

    const toggleProductForm = () => {
        setOpen(!open)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const fetchProducts = async () => {
        const response = await axios.get('/myapi/api/product/allproducts')
        setproducts(response.data)
        console.log(response.data);

    }
    useEffect(() => {
        fetchProducts()
    }, [])

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



    const handleSave = async (id) => {
        const produc = products.find(prod => prod.prodId == id)
        let imageToSend = updProdImage;

        // If no new image is selected, fetch the existing image
        if (!imageToSend) {
            try {
                const imageResponse = await axios.get(`/myapi/api/images?imageName=${produc.prodImageUrl}`, { responseType: 'blob' });
                imageToSend = new File([imageResponse.data], produc.prodImageUrl, { type: imageResponse.headers['content-type'] });
                const formData = new FormData();
                formData.append('prodName', updProdName || produc.prodName);
                formData.append('prodPrice', updProdPrice || produc.prodPrice);
                formData.append('imageName', imageToSend);

                const reponse = await axios.put(`/myapi/api/product/update_product/${id}`, formData)
                console.log(reponse, '@@@@@@@@@@@@@@@@@@');

                if (reponse.status === 200) {
                    console.log('@@@@@@@@@@@11111');
                    triggerMessage('Product updated successfully', 'success')
                    setEditMode(null)
                    fetchProducts()
                }

            } catch (error) {
                triggerMessage('Failed to fetch existing image', 'error');
                return;
            }

        } else {
            const formData = new FormData();
            formData.append('prodName', updProdName || produc.prodName);
            formData.append('prodPrice', updProdPrice || produc.prodPrice);
            formData.append('imageName', updProdImage);

            const reponse = await axios.put(`/myapi/api/product/update_product/${id}`, formData)
            console.log(reponse, '@@@@@@@@@@@@@@@@@@');

            if (reponse.status === 200) {
                console.log('@@@@@@@@@@@11111');
                triggerMessage('Product updated successfully', 'success')
                setEditMode(null)
                fetchProducts()
            }
        }
    }
    const handleEdit = (id) => {
        setEditMode(id)
    }
    const handleDelete = async (prodId) => {
        const confirmed = confirm('Delete the product')
        if (confirmed) {
            const response = await axios.delete(`/myapi/api/product/delete/${prodId}`)
            if (response.status == 200) {
                triggerMessage('Product deleted Successfully', 'success')
                fetchProducts()
            }
        }
    }



    return (
        <div className='container-fixed'>
            <div className='content-wrapper'>
                <Row className='mt-5'>
                    <Col xs={10}>
                        <h3>All Products </h3>
                    </Col>
                    <Col xs={2}>
                        <StyledButton variant="contained" color="primary" onClick={toggleProductForm}>+ Add Product</StyledButton>
                    </Col>
                </Row>
                <Row>

                    <Col md={12}>
                        <Card className='mt-2 scrollable-card'>
                            <Card.Body>
                                <Card.Title className='text-center'>All Product List</Card.Title>
                                <div className='table-container'>
                                    {
                                        products.length > 0 ?
                                            <>
                                                <Table striped bordered hover>
                                                    <thead>
                                                        <tr>
                                                            <th>ID</th>
                                                            <th>CATEGORY</th>
                                                            <th>Name</th>
                                                            <th>Price</th>
                                                            <th>Image</th>
                                                            <th>Action</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {products.map(item => (
                                                            <tr key={item.prodId} className='TableRowInCategory'>
                                                                <td>{item.prodId}</td>
                                                                <td>{item.category.cateName}</td>
                                                                {editMode == item.prodId ?
                                                                    <td> <input type="text" name="" id="" defaultValue={item.prodName}
                                                                        onChange={(e) => setUpdProdName(e.target.value)} /></td>
                                                                    :
                                                                    <td>{item.prodName}</td>
                                                                }


                                                                {editMode == item.prodId ?
                                                                    <td>  <input type="text" name="" id="" defaultValue={item.prodPrice}
                                                                        onChange={(e) => {
                                                                            if (/^\d*(\.\d*)?$/.test(e.target.value)) {
                                                                                setUpdProdPrice(e.target.value)
                                                                            } else {
                                                                                triggerMessage('Price should contain only numbers..', 'error');
                                                                            }
                                                                        }
                                                                        } /></td>
                                                                    :
                                                                    <td>{item.prodPrice}</td>
                                                                }

                                                                {editMode == item.prodId ?
                                                                    <td> <input type="file" name="" id=""
                                                                        onChange={(e) => setUpdProdImage(e.target.files[0])} /></td>

                                                                    :
                                                                    <td>
                                                                        {/* /myapi/api/images?imageName=${item.prodImageUrl} */}

                                                                        <img src={`/myapi/api/images?imageName=${item.prodImageUrl}`} alt="image" style={{ width: '30px', height: '30px' }}
                                                                        />
                                                                    </td>
                                                                }


                                                                <td >
                                                                    {editMode === item.prodId ? (
                                                                        <IconButton className='IconButton' onClick={() => handleSave(item.prodId)}>
                                                                            <SaveIcon className="saveIcon" />
                                                                        </IconButton>
                                                                    ) : (
                                                                        <IconButton className='IconButton' onClick={() => handleEdit(item.prodId)}>
                                                                            <EditIcon className="editIcon" />
                                                                        </IconButton>
                                                                    )}
                                                                    <IconButton className='IconButton' onClick={() => handleDelete(item.prodId)}>
                                                                        <DeleteIcon className="deleteIcon" />
                                                                    </IconButton>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </> :
                                            <>
                                                <h3>No products found</h3>
                                            </>
                                    }

                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                {open && <AddProduct open={open} handleClose={handleClose} triggerMessage={triggerMessage} fetchProducts={fetchProducts} />}
            </div>
        </div>
    );
}

export default Products
