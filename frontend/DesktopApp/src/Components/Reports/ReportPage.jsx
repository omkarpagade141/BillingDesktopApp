import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Form } from 'react-bootstrap';
import { Container, Typography } from '@mui/material';
import PieChartComponent from './AllBillsPieChart';
import TimeVsCustomerChart from './TimeVsCustomer';
import axios from 'axios';

function ReportPage() {
  const [noOfProd,setNoOfProd]=useState([])


  const fetchProducts = async () => {
    const response = await axios.get('/myapi/api/product/allproducts')
    setNoOfProd(response.data)

}
useEffect(() => {
    fetchProducts()
}, [])

  return (
    <div>
      <Row className='mt-4'>
        <Col md={8}>
          <Row>
            <Col md={6}>
              <Card className='fixed-card'>
                <Card.Body>
                  <Card.Title className='text-center'>All Bills</Card.Title>
                  <Row > 
                    <Col md={12} className='text-center'>
                    <h3>0</h3>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className='fixed-card'>
                <Card.Body>
                  <Card.Title className='text-center'>Today's Bills</Card.Title>
                  <Row > 
                    <Col md={12} className='text-center'>
                    <h3>0</h3>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>


          <Row className='mt-4'>
            <Col md={6}>
              <Card className='fixed-card'>
                <Card.Body>
                  <Card.Title className='text-center'>Today's Business</Card.Title>
                  <Row > 
                    <Col md={12} className='text-center'>
                    <h3>0 Rs</h3>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className='fixed-card'>
                <Card.Body>
                  <Card.Title className='text-center'>Monthly Business</Card.Title>
                  <Row > 
                    <Col md={12} className='text-center'>
                    <h3>0</h3>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>



          <Row className='mt-4'>
            <Col md={6}>
              <Card className='fixed-card'>
                <Card.Body>
                  <Card.Title className='text-center'>Total Products</Card.Title>
                  <Row > 
                    <Col md={12} className='text-center'>
                    <h3>{noOfProd.length}</h3>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className='fixed-card'>
                <Card.Body>
                  <Card.Title className='text-center'>All Customers</Card.Title>
                  <Row > 
                    <Col md={12} className='text-center'>
                    <h3>0</h3>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col md={4} className=''>
          <Container>
            <PieChartComponent />
          </Container></Col>
      </Row>
      <Row>
        <Col md={7}>
          <div style={{ padding: '20px' }}>
            <TimeVsCustomerChart />
          </div>
        </Col>
      </Row>

    </div>
  )
}

export default ReportPage
