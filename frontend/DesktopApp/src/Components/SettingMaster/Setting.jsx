import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import './setting.css'


const Setting = () => {
  const [businessName, setBusinessName] = useState('')
  const [businessMobile, setBusinessMobile] = useState('')
  const [businessEmail, setBusinessEmail] = useState('')
  const [businessAddress, setBusinessAddress] = useState('')
  const [businessLogo, setBusinessLogo] = useState('')


  const handleSubmit = async (e) => {
    e.preventDefault();
     
    
    const dataToSend={
      businessName,
      businessMobile,
      businessEmail,
      businessAddress,
      businessLogo
    }
    console.log(dataToSend);
    

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

  return (
    <div className="container mt-5 settingMasterFormDiv">

      <Row className='justify-content-md-center'>

        <Col md={8} >
          <Card className='p-3 mt-4'>
            <Form onSubmit={(e) => { handleSubmit(e) }}>
              <Row >

                <Col md={6} className='mt-1'>
                  <Form.Group controlId="formCategoryName">
                    <Form.Label>Business Name:</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      placeholder="Enter category name"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6} className='mt-1'>
                  <Form.Group controlId="formCategoryName">
                    <Form.Label>Business Mobile:</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      placeholder="Enter category name"
                      value={businessMobile}
                      onChange={(e) => setBusinessMobile(e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col md={6} className='mt-4'>
                  <Form.Group controlId="formCategoryName">
                    <Form.Label>Business Email:</Form.Label>
                    <Form.Control
                      type="Email"
                      required
                      placeholder="Enter category name"
                      value={businessEmail}
                      onChange={(e) => setBusinessEmail(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6} className='mt-4'>
                  <Form.Group controlId="formCategoryName">
                    <Form.Label>Business GST Number:</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      placeholder="Enter category name"
                    // value={categoryName}
                    // onChange={(e) => setCategoryName(e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col md={6} className='mt-4'>
                  <Form.Group controlId="formtProductName">
                    <Form.Label>Business Logo:</Form.Label>
                    <Form.Control
                      type="file"
                      required
                      placeholder="Enter product name"
                      onChange={(e) => setBusinessLogo(e.target.files[0])}
                    />
                  </Form.Group>
                </Col>
                <Col md={6} className='mt-4'>
                  <Form.Group controlId="formCategoryName">
                    <Form.Label>Business Address:</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      placeholder="Enter category name"
                      value={businessAddress}
                      onChange={(e) => setBusinessAddress(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className='justify-content-md-center mt-4 p-2'>
                <StyledButton type='submit'>Update</StyledButton>
              </Row>

            </Form>
          </Card>
        </Col>

      </Row>



    </div>
  );
};

export default Setting;
