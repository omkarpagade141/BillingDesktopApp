import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Form } from 'react-bootstrap';
import { Container, Typography } from '@mui/material';
import PieChartComponent from './AllBillsPieChart';
import TimeVsCustomerChart from './TimeVsCustomer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 





function ReportPage() {
  const navigate = useNavigate();
  const [noOfProd, setNoOfProd] = useState([])
  const [customers, setCustomers] = useState([])


  const openAllCustomer = () => {
    navigate('/dashboard/allcustomers')
  }
  
  const openAllProducts = () => {
    navigate('/dashboard/products')
  }

  const fetchCustomer = async () => {
    const response = await axios.get("/myapi/api/customer/allcustomers")
    setCustomers(response.data)


  }


  const fetchProducts = async () => {
    const response = await axios.get('/myapi/api/product/allproducts')
    setNoOfProd(response.data)

  }
  useEffect(() => {
    fetchProducts()
    fetchCustomer()
  }, [])

  return (
    <div className='scrollToReportDiv p-1'>
      <Row className='mt-4'>
        <Col md={12}>
          <Row>
            <Col md={2}>
              <Card className='fixed-card' style={{ height: '90px' }}>
                <Card.Body>
                  <Card.Title className='text-center' style={{ fontSize: '15px' }}>All Bills</Card.Title>
                  <Row >
                    <Col md={12} className='text-center'>
                      <h3>0</h3>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col md={2}>
              <Card className='fixed-card' style={{ height: '90px' }}>
                <Card.Body>
                  <Card.Title className='text-center' style={{ fontSize: '15px' }}>Today's Bills</Card.Title>
                  <Row >
                    <Col md={12} className='text-center'>
                      <h3>0</h3>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col md={2}>
              <Card className='fixed-card' style={{ height: '90px' }} onClick={openAllCustomer }>
                <Card.Body>
                  <Card.Title className='text-center' style={{ fontSize: '15px' }}>All Customers</Card.Title>
                  <Row >
                    <Col md={12} className='text-center'>
                      <h3>{customers.length}</h3>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col md={2}>
              <Card className='fixed-card' style={{ height: '90px' }} onClick={openAllProducts}>
                <Card.Body>
                  <Card.Title className='text-center' style={{ fontSize: '15px' }}>Total Products</Card.Title>
                  <Row >
                    <Col md={12} className='text-center'>
                      <h3>{noOfProd.length}</h3>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col md={2}>
              <Card className='fixed-card' style={{ height: '90px' }}>
                <Card.Body>
                  <Card.Title className='text-center' style={{ fontSize: '15px' }}>Today's Business</Card.Title>
                  <Row >
                    <Col md={12} className='text-center'>
                      <h3>0 Rs</h3>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col md={2}>
              <Card className='fixed-card' style={{ height: '90px' }}>
                <Card.Body>
                  <Card.Title className='text-center' style={{ fontSize: '15px' }}>Monthly Business</Card.Title>
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
       
      </Row>
      <Row style={{marginTop:'15px'}}>
      <Col md={4}>
          <Container>
            <PieChartComponent />
          </Container>
        </Col>
        <Col md={8}>
          <div >
            <TimeVsCustomerChart />
          </div>
        </Col>
      </Row>

    </div>
  )
}

export default ReportPage
