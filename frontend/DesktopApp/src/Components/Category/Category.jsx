import React, { useState } from 'react';
import { Table, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { styled } from '@mui/system';
import './Category.css'; // Make sure to create this CSS file or include the styles in your global CSS

function Category() {
    const [categoryName, setCategoryName] = useState('');
    const [categoryStatus, setCategoryStatus] = useState('active');
    const [image, setImage] = useState(null);
    const [categories, setCategories] = useState([
        { id: 1, name: 'Category 1', status: 'active' },
        { id: 2, name: 'Category 2', status: 'inactive' },
      
    ]);

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

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the form from submitting and refreshing the page
        console.log("Category added:", { categoryName, categoryStatus });
        setCategories([
            ...categories,
            { id: categories.length + 1, name: categoryName, status: categoryStatus, image: image 
             },
        ]);
    };

    return (
        <div className='container-fixed'>
            <div className='content-wrapper'>
                <Row>
                    <Col md={4}>
                        <Card className='mt-4 fixed-card'>
                            <Card.Body>
                                <Card.Title className='text-center'>Add Category</Card.Title>
                                <Row>
                                    <Col md={{ span: 102, offset: 1 }}>
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

                                            <Form.Group>
                                                <Form.Label className='mt-3'>Category Status:</Form.Label>
                                                <Form.Check
                                                    type="radio"
                                                    label="Active"
                                                    name="categoryStatus"
                                                    id="active"
                                                    value="active"
                                                    checked={categoryStatus === 'active'}
                                                    onChange={(e) => setCategoryStatus(e.target.value)}
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    label="Inactive"
                                                    name="categoryStatus"
                                                    id="inactive"
                                                    value="inactive"
                                                    checked={categoryStatus === 'inactive'}
                                                    onChange={(e) => setCategoryStatus(e.target.value)}
                                                />
                                            </Form.Group>
                                            

                                            <StyledButton type="submit" className='mt-3'>
                                                Add Category
                                            </StyledButton>
                                        </Form>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={8}>
                        <Card className='mt-4 scrollable-card'>
                            <Card.Body>
                                <Card.Title className='text-center'>All Category List</Card.Title>
                                <div className='table-container'>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Status</th>
                                                <th>Image</th>
                                                <th>Action</th>
                                                
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {categories.map(item => (
                                                <tr key={item.id}>
                                                    <td>{item.id}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.status}</td>
                                                    <td>
                                                        <img src={
                                                            item.image
                                                        } alt="category image" style={{ width: '50px', height: '50px' }}
                                                        />
                                                    </td>
                                                    <td > 
                                                        <Button variant="danger" style={{height:'30px'}} onClick={() => deleteCategory(item.id)}>Delete</Button>
                                                        <Button variant="success" style={{height:'30px'}} onClick={() => updateCategory(item.id)}>Update</Button>
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
            </div>
        </div>
    );
}

export default Category;
