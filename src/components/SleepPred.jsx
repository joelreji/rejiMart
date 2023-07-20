import React, { useState } from 'react';
import { Row, Col, Card, FloatingLabel, Form, Button, Modal, Tooltip, OverlayTrigger} from "react-bootstrap"
import axios from 'axios';


const SleepPred = () => {

    const [gender, setGender] = useState("")
    const [age, setAge] = useState(0)
    const [sleepDuration, setSleepDuration] = useState(0)
    const [excercise, setExcerciseDuration] = useState(0)
    const [sleepQuality, setSleepQuality] = useState(0)
    const [stressLevel, setStressLevel] = useState(0)
    const [heartRate, setHeartRate] = useState(0)
    const [steps, setSteps] = useState(0)
    const [bmi, setBMI] = useState("")
    const [sys, setSys] = useState(0)
    const [dias, setDias] = useState(0)
    const [pred, setPred] = useState("")
    const [showModal, setShowModal] = useState(false);


    const selectGender = (event) => {
        setGender(event.target.value)
    }
    const selectAge = (event) => {
        setAge(event.target.value)
    }
    const selectSleepDuration = (event) => {
        setSleepDuration(event.target.value)
    }
    const selectExcerise = (event) => {
        setExcerciseDuration(event.target.value)
    }
    const selectSleepQuality = (event) => {
        setSleepQuality(event.target.value)
    }
    const selectStressLevel = (event) => {
        setStressLevel(event.target.value)
    }
    const selectHeartRate = (event) => {
        setHeartRate(event.target.value)
    }
    const selectSteps = (event) => {
        setSteps(event.target.value)
    }
    const selectBMI = (event) => {
        setBMI(event.target.value)
    }
    const selectSys = (event) => {
        setSys(event.target.value)
    }
    const selectDias = (event) => {
        setDias(event.target.value)
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

    const predict = async (evt) => {
        evt.preventDefault();
        const url = 'http://heimdall-1523192821.us-east-2.elb.amazonaws.com:8082/predict/';

        const headers = {
            'X-api-key': '8XXL1oIVivRjyGfqQEishNwKeY1srn6F',
            'X-username': 'joelreji',
            'x-model-id': '64b93c6a0ad9d0dc28bbd8da',
        };

        let postData = {
            features: {
                features: {
                    Gender: gender,
                    Age: age,
                    'Sleep Duration': sleepDuration,
                    'Quality of Sleep': sleepQuality,
                    'Physical Activity Level': excercise,
                    'Stress Level': stressLevel,
                    'BMI Category': bmi,
                    'Heart Rate': heartRate,
                    'Daily Steps': steps,
                    systolic: sys,
                    diastolic: dias,
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



    return (
        <Card className="border-0">
            <Card.Img variant="top" src="/insomnia.png" />
            <Card.Body>
                <Card.Title className="fw-bold display-6 pb-3">Sleep Disorder Prediction</Card.Title>
                <Card.Text>
                    <p className="pb-3">Please fill out the below fields to check if you are at risk for a sleep disorder.</p>
                    <Form>
                        <Row>
                            <Col>
                                <FloatingLabel controlId="floatingSelect" label="Gender">
                                    <Form.Select onChange={selectGender}>
                                        <option value="n/a">N/A</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                            <Col>
                                <FloatingLabel controlId="floatingInput" label="Age">
                                    <Form.Control type="number" placeholder="age" onChange={selectAge} />
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row className="pt-2">
                            <Col>
                                <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltip("The number of hours you sleep per day.")}
                                >
                                    <FloatingLabel controlId="floatingInput" label="Sleep Duration">
                                        <Form.Control type="number" placeholder="duration" onChange={selectSleepDuration} />
                                    </FloatingLabel>
                                </OverlayTrigger>
                            </Col>
                            <Col>
                                <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltip("The number of minutes you enage in physical activity daily.")}
                                >
                                    <FloatingLabel controlId="floatingInput" label="Excercise">
                                        <Form.Control type="number" placeholder="excerise" onChange={selectExcerise} />
                                    </FloatingLabel>
                                </OverlayTrigger>
                            </Col>
                        </Row>
                        <Row className="pt-2">
                            <Col>
                                <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltip("A rating of your sleep quality ranging from 1(low) to 10(high)")}
                                >
                                    <FloatingLabel controlId="floatingSelect" label="Sleep Quality">
                                        <Form.Select onChange={selectSleepQuality}>
                                            {Array.from({ length: 10 }, (_, index) => (
                                                <option key={index + 1} value={index + 1}>
                                                    {index + 1}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </FloatingLabel>
                                </OverlayTrigger>
                            </Col>
                            <Col>
                            <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltip("A rating of your stress level ranging from 1(low) to 10(high)")}
                                >
                                <FloatingLabel controlId="floatingSelect" label="Stress Level">
                                    <Form.Select onChange={selectStressLevel}>
                                        {Array.from({ length: 10 }, (_, index) => (
                                            <option key={index + 1} value={index + 1}>
                                                {index + 1}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </FloatingLabel>
                            </OverlayTrigger>
                            </Col>
                        </Row>
                        <Row className="pt-2">
                            <Col>
                            <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltip("Your resting heart rate measured in beats per minute.")}
                                >
                                <FloatingLabel controlId="floatingInput" label="Heart Rt">
                                    <Form.Control type="number" placeholder="bpm" onChange={selectHeartRate} />
                                </FloatingLabel>
                                </OverlayTrigger>
                            </Col>
                            <Col>
                            <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltip("Average number of steps you take per day")}
                                >
                                <FloatingLabel controlId="floatingInput" label="Steps">
                                    <Form.Control type="number" placeholder="step" onChange={selectSteps} />
                                </FloatingLabel>
                                </OverlayTrigger>
                            </Col>
                        </Row>
                        <Row className="pt-2">
                            <Col>
                            <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltip("Your body mass index rating")}
                                >
                                <FloatingLabel controlId="floatingSelect" label="BMI">
                                    <Form.Select onChange={selectBMI}>
                                        <option value="Normal">Normal</option>
                                        <option value="Overweight">Overweight</option>
                                        <option value="Obese">Obese</option>
                                    </Form.Select>
                                </FloatingLabel>
                                </OverlayTrigger>
                            </Col>
                        </Row>
                        <Row className="pt-2">
                            <Col>
                            <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltip("You systolic blood pressure; top number in your blood pressure")}
                                >
                                <FloatingLabel controlId="floatingInput" label="Systolic BP">
                                    <Form.Control type="number" placeholder="sys" onChange={selectSys} />
                                </FloatingLabel>
                                </OverlayTrigger>
                            </Col>
                            <Col>
                            <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltip("You diastolic blood pressure; bottom number in your blood pressure")}
                                >
                                <FloatingLabel controlId="floatingInput" label="Diastolic BP">
                                    <Form.Control type="number" placeholder="dias" onChange={selectDias} />
                                </FloatingLabel>
                                </OverlayTrigger>

                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Button variant="success" onClick={predict}>Check Now</Button>
                        </Row>
                    </Form>
                </Card.Text>
            </Card.Body>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title className="custom-color">Prediction</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {pred === "None" ? (
                        <p>Congrats! You are not at risk for a sleep disorder.</p>
                    ) : (
                            <p>Based on your details, you are at risk for <strong>{pred}</strong></p>
                        )}
                </Modal.Body>
            </Modal>
        </Card>
    )
}
export default SleepPred;