import './Components.css';
import { Container, Row, Col, Accordion, Alert} from "react-bootstrap"
import SleepPred from './SleepPred';

const Demo = () => {

  return (
    <div className="App">
      <div className="pb-5">
        <Container>
          <Row className="flex-column-reverse flex-md-row justify-content-center">
            <Col className="col-md-12 bg-white">
              <div className="container pt-3">
                <div className="text-container p-3">
                  <h1 className="display-2 fw-bold pb-1 custom-color m-2">Heimdall Plugins</h1>
                  <p className="pb-1 pt-4 m-2 pb-5" style={{ fontSize: '25px' }}>
                    This plugin store is built to showcase the true power of <a href="http://www.heimdallapp.org">Heimdall</a></p>
                </div>
              </div>
            </Col>
          </Row>
          <Row xs={1} md={2} className="g-4">
            <Col>
              <Accordion defaultActiveKey="0" className="pb-5">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Are you at risk for a sleep disorder?</Accordion.Header>
                  <Accordion.Body>              
                    <SleepPred></SleepPred>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
          </Row>
          <Alert variant='light' style={{ fontSize: '10px' }}>These plugins are for demonstration purposes. All predictions are based on past data and could have inacuracies. Please consult a professional before making an decisions.</Alert>
        </Container>
      </div>
    </div>
  );
}

export default Demo;