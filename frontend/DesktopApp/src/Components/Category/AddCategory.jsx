// src/components/ModalComponent.jsx
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { Row, Col, Card, Form } from 'react-bootstrap';
import { styled } from '@mui/material';
import axios from 'axios';

const AddCategory = ({ open, handleClose , fetchcategories, triggerMessage }) => {

    const [categoryName, setCategoryName] = useState('')
    const [image, setImage] = useState(null);

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
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the form from submitting and refreshing the page
        const formData = new FormData();
        formData.append('cateName', categoryName);
        formData.append('imageName', image);
        try {
            const response = await axios.post(' /myapi/api/category/add_catewithimg', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            if (response.status===201) {
                console.log(response.data);
                fetchcategories();
                handleClose();
                triggerMessage('Category added successfully', 'success');
                
            }
           
            

        } catch (error) {

            triggerMessage('Error While adding Category', 'error');
            console.log(error);
        }


    };
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogContent>
                <Row>
                    <Col md={12}>
                        <Card className='fixed-card'>
                            <Card.Body>
                                <Card.Title className='text-center'>Add Category</Card.Title>
                                <Row>
                                    <Col md={12}>
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Group controlId="formCategoryName">
                                                <Form.Label>Category Name:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    required
                                                    placeholder="Enter category name"
                                                    value={categoryName}
                                                    onChange={(e) => setCategoryName(e.target.value)}
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="formCategoryName">
                                                <Form.Label className='mt-3'>Category Image:</Form.Label>
                                                <Form.Control
                                                    type="file"
                                                    required
                                                    placeholder="Enter category name"
                                                    onChange={(e) => setImage(e.target.files[0])}

                                                />
                                            </Form.Group>

                                             
                                            <Button color="primary" type='submit'>Add Category</Button>
                                            <Button onClick={handleClose} color="primary">
                                                Close
                                            </Button>

                                        </Form>

                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </DialogContent>

        </Dialog>
    );
};

export default AddCategory;
