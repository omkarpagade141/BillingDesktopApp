import React, { useState } from 'react'
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Row, Col, Card, Form ,Button} from "react-bootstrap";
import axios from 'axios';


function AddCustomer({ handleClose,open }) {
    const [customerName,setCustomerName]=useState('')
    const [contactNumber,setContactNumber]=useState('')

    const handleSubmit=async(e)=>{
        e.preventDefault();
     const response=  await axios.post("/myapi/api/customer/register_customer",
            {
                "custFullName":`${customerName}`,
                "custMobile":`${contactNumber}`
            }
        )
        console.log(response.data)
    }


    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <Row>
                        <Col md={12}>
                            <Card className="fixed-card">
                                <Card.Body>
                                    <Card.Title className="text-center">Add Customer</Card.Title>
                                    <Row>
                                        <Col md={12}>
                                            <Form onSubmit={(e)=>{handleSubmit(e)}}>

                                                <Form.Group controlId="formtProductName">
                                                    <Form.Label>Customer Name:</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        required
                                                        placeholder="Enter customer name"
                                                        value={customerName}
                                                        onChange={
                                                            (e) => setCustomerName(e.target.value)
                                                        }

                                                    />
                                                </Form.Group>

                                                <Form.Group>
                                                    <Form.Label className="mt-3">Customer Contact No:</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        required
                                                        placeholder="Enter contact number"
                                                        value={contactNumber}
                                                        onChange={
                                                            (e) => setContactNumber(e.target.value)
                                                        }

                                                    />
                                                </Form.Group>

                                                <Button color="primary" type="submit">
                                                    Add Customer
                                                </Button>
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

        </div>
    )
}

export default AddCustomer
