import './Components.css';
import { Container, Row, Col, Card, Spinner } from "react-bootstrap"

const Home = () => {

    return (
        <div>
          <div>
            <Container>
              <Row className="flex-column-reverse flex-md-row justify-content-center">
                <Col className="col-md-12 bg-white">
                  <div className="container pt-3">
                    <div className="text-container p-3">
                      <h1 className="display-2 fw-bold pb-1 custom-color m-2">Welcome to AlgoMart</h1>
                      <p className="pb-1 pt-4 m-2" style={{ fontSize: '25px' }}>
                        This marketplace is built to showcase the true power of <a href="http://www.heimdallapp.org">Heimdall</a></p>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
          <div className="row-2 pt-3">
            <Container className="row-2">
              <Card className="border-0 row-2 p-3 text-center pb-1">
                <Card.Body>
                  <Card.Title className="custom-color fw-bold display-3 m-3 pb-4 row-2">Mission</Card.Title>
                  <Card.Text className="pb-2" style={{ fontSize: '25px' }}>
                    AlgoMart is the idea that birthed Heimdall. Heimdall was built to serve the greater purpose of being the backbone of AlgoMart.
                    The goal of AlgoMart is to create a platform for the sale of incredible algorithms. Heimdall's machine learning models will
                    be the first to be integrated into AlgoMart. All algorithms on AlgoMart will be onboarded onto the <strong><a href="https://polygon.technology/">Polygon Blockchain</a></strong> and the owner
                    will be able to utilize the algorithm for their specific needs. 
                  </Card.Text>
                </Card.Body>
              </Card>
              <p className="custom-color bg-white display-5 fw-bold pb-5">Algorithms are unique and non-fungible</p>
            </Container>
            <Container className="row-2">
              <Card className="border-0 row-2 pt-5 text-center">
                <Card.Body>
                  <Card.Title className="custom-color fw-bold display-3 m-3 pb-4 row-2">Coming Soon</Card.Title>
                  <Card.Text className="pb-2" style={{ fontSize: '25px' }}>
                  <Spinner animation="grow" size="lg" variant="success" />
                  </Card.Text>
                </Card.Body>
              </Card>
            </Container>
          </div>
        </div>
      );
    }
    
    export default Home;