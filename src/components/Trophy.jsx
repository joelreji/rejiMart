import React, { useState } from "react";
import './Components.css';
import { Container, Row, Col, Card, FloatingLabel, Form, Tooltip, OverlayTrigger, Button, Modal } from "react-bootstrap"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

const Trophy = () => {

    const [selectedDate, setSelectedDate] = useState(null);
    const [daysBeforeToday, setDaysBeforeToday] = useState(0);
    const [lastVisitCategory, setLastVisitCategory] = useState(null);
    const [visits, setVisits] = useState(0);
    const [covers, setCovers] = useState(0);
    const [lifeVisits, setLifeVisits] = useState(0);
    const [lifeCovers, setLifeCovers] = useState(0);
    const [lifeSpend, setLifeSpend] = useState(0);
    const [guestTag, setGuestTag] = useState(null);
    const [pred, setPred] = useState("")
    const [showModal, setShowModal] = useState(false);



    const selectVisitCategory = (event) => {
        setLastVisitCategory(event.target.value)
    }

    const selectVisits = (event) => {
        setVisits(event.target.value)
    }

    const selectCovers = (event) => {
        setCovers(event.target.value)
    }

    const selectLifeVisits = (event) => {
        setLifeVisits(event.target.value)
    }

    const selectLifeCovers = (event) => {
        setLifeCovers(event.target.value)
    }

    const selectGuestTag = (event) => {
        setGuestTag(event.target.value)
    }

    const selectLifeSpend = (event) => {
        setLifeSpend(event.target.value)
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }
    const handleShowModal = () => {
        setShowModal(true);
    }


    const renderTooltip = (description) => (
        <Tooltip id="button-tooltip">
            {description}
        </Tooltip>
    );

    const handleDateChange = (date) => {
        setSelectedDate(date);

        // Calculate the number of days before today
        if (date) {
            const today = new Date();
            const differenceInTime = today.getTime() - date.getTime();
            const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
            setDaysBeforeToday(differenceInDays);
        } else {
            setDaysBeforeToday(0);
        }
    };

    const predict = async (evt) => {
        evt.preventDefault();
        const url = 'https://predict.heimdallapp.org/predict/';

        const headers = {
            'X-api-key': 'UmiTZ39oUvSzNnpCXzPCYme7vYngxH0G',
            'X-username': 'joelreji',
            'x-model-id': '64e4b1417b49beb690f70235',
        };

        let postData = {
            features: {
                features: {
                    'Visits': visits,
                    'Covers': covers,
                    'Lifetime Visits': lifeVisits,
                    'Lifetime Covers': lifeCovers,
                    'Lifetime Total Spend': lifeSpend,
                    'Guest Tags': guestTag,
                    'days_ago': daysBeforeToday,
                    'time_category': lastVisitCategory,
                },
            },
        };

        console.log(postData);
        try {
            const response = await axios.post(url, postData, { headers: headers });
            setPred(response.data.prediction);
            handleShowModal();
        } catch (error) {
            console.log(error);
        }
    }


    const tags = ['Regular', 'VIP,Regular', 'Alert the Manager', 'None', 'VIP',
        'Friend Of Owner', 'Friend Of Owner,Regular', 'Friend Of Employee',
        'Friend Of Owner,VIP', 'VIP,Alert the Manager', 'Employee',
        'Friend Of Employee,VIP', 'Friend Of Owner,VIP,Regular',
        'Friend Of Owner,Alert the Manager',
        'Alert the Manager,Alert the Chef',
        'Friend Of Employee,Alert the Chef',
        'Friend Of Owner,VIP,Alert the Manager']

    const times = ['Morning',
        'Afternoon',
        'Evening']

    return (
        <div>
            <Container>
                <Card className="border-0 pt-2 pb-5">
                    <Card.Header className="bg-white border-0 display-4 fw-bold">Trophy Brewing</Card.Header>
                </Card>
                <Card className="border-0 pt-5 text-center">
                    <Card.Header className="bg-white border-0 display-5 strong">Open Table - Customer Total Spend</Card.Header>
                    <Card.Body>
                        <p className="py-4">Get the customer total spend prediction based on their previous open table details.</p>
                        <Row className="py-2">
                            <Col>
                                <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltip("The date of the last visit")}
                                >
                                    <DatePicker
                                        selected={selectedDate}
                                        onChange={handleDateChange}
                                        dateFormat="yyyy-MM-dd"
                                        placeholderText="Last Visit Date"
                                        className="form-control"
                                    />
                                </OverlayTrigger>
                            </Col>
                            <Col>
                                <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltip("The time category of the last visit")}
                                >
                                    <FloatingLabel controlId="floatingSelect" label="Last Visit Time">
                                        <Form.Select onChange={selectVisitCategory}>
                                            <option value="">Select a Time Category</option>
                                            {times.map((time, index) => (
                                                <option key={index} value={time}>
                                                    {time}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </FloatingLabel>
                                </OverlayTrigger>
                            </Col>
                        </Row>

                        <Row className="py-2">
                            <Col>
                                <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltip("Total customer visits.")}
                                >
                                    <FloatingLabel controlId="floatingInput" label="Visits">
                                        <Form.Control type="number" placeholder="visits" onChange={selectVisits} />
                                    </FloatingLabel>
                                </OverlayTrigger>
                            </Col>
                            <Col>
                                <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltip("Total customer covers.")}
                                >
                                    <FloatingLabel controlId="floatingInput" label="Covers">
                                        <Form.Control type="number" placeholder="covers" onChange={selectCovers} />
                                    </FloatingLabel>
                                </OverlayTrigger>
                            </Col>
                        </Row>
                        <Row className="py-2">
                            <Col>
                                <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltip("Total customer visits over the lifetime of the relationship")}
                                >
                                    <FloatingLabel controlId="floatingInput" label="Lifetime Visits">
                                        <Form.Control type="number" placeholder="lifetimevisits" onChange={selectLifeVisits} />
                                    </FloatingLabel>
                                </OverlayTrigger>
                            </Col>
                            <Col>
                                <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltip("Total customer covers over the lifetime of the relationship")}
                                >
                                    <FloatingLabel controlId="floatingInput" label="Lifetime Covers">
                                        <Form.Control type="number" placeholder="lifetimecovers" onChange={selectLifeCovers} />
                                    </FloatingLabel>
                                </OverlayTrigger>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltip("Total customer spend over the lifetime of the relationship")}
                                >
                                    <FloatingLabel controlId="floatingInput" label="Lifetime Total Spend">
                                        <Form.Control type="number" placeholder="lifetimeSpend" onChange={selectLifeSpend} />
                                    </FloatingLabel>
                                </OverlayTrigger>
                            </Col>
                            <Col>
                                <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltip("The guest tag from open table")}
                                >
                                    <FloatingLabel controlId="floatingSelect" label="Guest Tag">
                                        <Form.Select onChange={selectGuestTag}>
                                            <option value="">Select a Guest Tag</option>
                                            {tags.map((tag, index) => (
                                                <option key={index} value={tag}>
                                                    {tag}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </FloatingLabel>
                                </OverlayTrigger>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Button variant="success" onClick={predict}>Check Now</Button>
                        </Row>
                    </Card.Body>
                    <Modal show={showModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title className="custom-color">Prediction</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Based on the customer details, they are projected to spend  <strong>${Number(pred).toFixed(2)/100}</strong></p>
                        </Modal.Body>
                    </Modal>
                </Card>
            </Container>
        </div>
    );
}

export default Trophy;