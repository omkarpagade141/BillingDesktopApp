import React from 'react'
import { Row, Col, Card, Form } from 'react-bootstrap';
import { Container, Typography } from '@mui/material';
import PieChartComponent from './AllBillsPieChart';
import TimeVsCustomerChart from './TimeVsCustomer';

function ReportPage() {
  return (
    <div>
      <Row className='mt-4'>
        <Col md={7}>
          <Row>
            <Col md={6}>
              <Card className='fixed-card'>
                <Card.Body>
                  <Card.Title className='text-center'>All Bills</Card.Title>
                  <Row></Row>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className='fixed-card'>
                <Card.Body>
                  <Card.Title className='text-center'>Today's Bills</Card.Title>
                  <Row></Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>


          <Row className='mt-3'>
            <Col md={6}>
              <Card className='fixed-card'>
                <Card.Body>
                  <Card.Title className='text-center'>Today's Business</Card.Title>
                  <Row></Row>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className='fixed-card'>
                <Card.Body>
                  <Card.Title className='text-center'>All Customer's</Card.Title>
                  <Row></Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col md={5} className=''>
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
