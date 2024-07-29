import React, { useState } from 'react';
import { Table, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { styled } from '@mui/system';
import './Product.css'; // Make sure to create this CSS file or include the styles in your global CSS
import axios from 'axios';
import AddProduct from './AddProduct';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

function Products() {
  
  const [openForm, setOpenForm] = useState(false)
  const [editMode, setEditMode] = useState(false);
  const [products, setproducts] = useState([
      { id: 1, categoryid : 1,name: 'Product 1', price: '299' },
      { id: 2, categoryid : 2,name: 'Product 2', price: '399' },
      { id: 3, categoryid : 3,name: 'Product 3', price: '299' },

  ]);

  const toggleProductForm = () => {
      setOpenForm(!openForm)
  }
  const handleClose = () => {
      setOpenForm(false)
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

  const handleSave=()=>{

  }
  const handleEdit=()=>{
      setEditMode(!editMode)
      
  }
  const handleDelete=()=>{
      
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
                                  <Table striped bordered hover>
                                      <thead>
                                          <tr>
                                              <th>ID</th>
                                              <th>C_ID</th>
                                              <th>Name</th>
                                              <th>Price</th>
                                              <th>Image</th>
                                              <th>Action</th>

                                          </tr>
                                      </thead>
                                      <tbody>
                                          {products.map(item => (
                                              <tr key={item.id} className='TableRowInCategory'>
                                                  <td>{item.id}</td>
                                                  <td>{item.categoryid}</td>
                                                  <td>{item.name}</td>
                                                  <td>{item.price}</td>
                                                  <td>
                                                      <img src={
                                                          item.image
                                                      } alt="image" style={{ width: '10px', height: '10px' }}
                                                      />
                                                  </td>
                                                  <td >
                                                      {editMode === true ? (
                                                          <IconButton className='IconButton' onClick={() => handleSave()}>
                                                              <SaveIcon className="saveIcon" />
                                                          </IconButton>
                                                       ) : ( 
                                                          <IconButton className='IconButton' onClick={() => handleEdit(true)}>
                                                              <EditIcon className="editIcon" />
                                                          </IconButton>
                                                       )} 
                                                      <IconButton className='IconButton' onClick={() => handleDelete()}>
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
              {openForm && <AddProduct open={open} handleClose={handleClose} />}
          </div>
      </div>
  );
}

export default Products
