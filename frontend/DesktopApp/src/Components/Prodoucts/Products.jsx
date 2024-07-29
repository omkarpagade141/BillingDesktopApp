import React, { useEffect, useState } from 'react';
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
  
  const [open, setOpen] = useState(false)
  const [editMode, setEditMode] = useState(null);
  const [products, setproducts] = useState([]);

  const toggleProductForm = () => {
      setOpen(!open)
  }
  const handleClose = () => {
      setOpen(false)
  }
  const fetchProducts= async()=>{
   const response= await axios.get('http://localhost:8080/api/product/allproducts')
   setproducts(response.data)
   console.log(response.data);

  }
  useEffect(()=>{
    fetchProducts()
  },[])

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
  const handleEdit=(id)=>{
      setEditMode(id)
      
  }
  const handleDelete= async(prodId)=>{
    const response = await axios.delete(`http://localhost:8080/api/product/delete/${prodId}`)
    console.log(response.data);
        
      
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
                                                  <td>{item.category.cateName
                                                  }</td>
                                                  <td>{item.prodName}</td>
                                                  <td>{item.prodPrice}</td>
                                                  <td>
                                                      <img src={`http://localhost:8080/api/images?imageName=${item.prodImageUrl}`} alt="image" style={{ width: '10px', height: '10px' }}
                                                      />
                                                  </td>
                                                  <td >
                                                      {editMode === item.prodId ? (
                                                          <IconButton className='IconButton' onClick={() => handleSave()}>
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
                              </div>
                          </Card.Body>
                      </Card>
                  </Col>
              </Row>
              {open && <AddProduct open={open} handleClose={handleClose} />}
          </div>
      </div>
  );
}

export default Products
