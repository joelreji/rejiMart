import React, { useState } from 'react';
import { Row, Col, Card, FloatingLabel, Form, Button, Modal, Tooltip, OverlayTrigger } from "react-bootstrap"
import axios from 'axios';


const SpotifyPop = () => {

    const [url, setUrl] = useState("")
    const [pred, setPred] = useState("")
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");



    const selectUrl = (event) => {
        setUrl(event.target.value)
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

    const extractTrackIdFromUrl = (url) => {
        const startIndex = url.indexOf('/track/') + '/track/'.length;
        const endIndex = url.indexOf('?');
        const trackId = url.substring(startIndex, endIndex !== -1 ? endIndex : url.length);
        return trackId;
    }

    const getSpotifyTrackData = async (accessToken, trackId) => {
        const endpoint = `https://api.spotify.com/v1/audio-features/${trackId}`;

        const headers = {
            'Authorization': `Bearer ${accessToken}`,
        };

        try {
            const response = await axios.get(endpoint, { headers });
            return response.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    const getSpotifyAudioAnalysis = async (accessToken, trackId) => {
        const endpoint = `https://api.spotify.com/v1/audio-analysis/${trackId}`;

        const headers = {
            'Authorization': `Bearer ${accessToken}`,
        };

        try {
            const response = await axios.get(endpoint, { headers });
            return response.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    const predict = async (evt) => {
        evt.preventDefault();
        const trackId = extractTrackIdFromUrl(url);
        if (!trackId) {
            setErrorMessage("Invalid Spotify URL. Please provide a valid Spotify track URL.");
            return;
        }
        setErrorMessage("")
        const clientId = '10021b767104448e9ad32caca58d6629';
        const clientSecret = '16c5aac8d68f41b9a4ba4dc7b95af1e7';

        try {
            const tokenResponse = await axios.post('https://accounts.spotify.com/api/token',
                'grant_type=client_credentials',
                {
                    headers: {
                        'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                });

            const accessToken = tokenResponse.data.access_token;
            const trackData = await getSpotifyTrackData(accessToken, trackId);
            const audioData = await getSpotifyAudioAnalysis(accessToken, trackId);
            console.log(trackData)
            console.log(audioData)

            const endpoint = 'https://predict.heimdallapp.org/predict/';
            const headers = {
                'X-api-key': 'j17SIV9KgjDfJ6zx12T677PksI0hOeCp',
                'X-username': 'joelreji',
                'x-model-id': '64bf198770cb203000da0b97',
            };

            let postData = {
                features: {
                    features: {
                        "danceability": trackData.danceability,
                        "energy": trackData.energy,
                        "key": trackData.key,
                        "loudness": trackData.loudness,
                        "mode": trackData.mode,
                        "speechiness": trackData.speechiness,
                        "acousticness": trackData.acousticness,
                        "instrumentalness": trackData.instrumentalness,
                        "liveness": trackData.liveness,
                        "valence": trackData.valence,
                        "tempo": trackData.tempo,
                        "duration_ms": trackData.duration_ms,
                        "time_signature": trackData.time_signature,
                        "track.num_samples": audioData.track.num_samples,
                        "track.duration": audioData.track.duration,
                        "track.offset_seconds": audioData.track.offset_seconds,
                        "track.window_seconds": audioData.track.window_seconds,
                        "track.analysis_sample_rate": audioData.track.analysis_sample_rate,
                        "track.analysis_channels": audioData.track.analysis_channels,
                        "track.end_of_fade_in": audioData.track.end_of_fade_in,
                        "track.loudness": audioData.track.loudness,
                        "track.tempo": audioData.track.tempo,
                        "track.tempo_confidence": audioData.track.tempo_confidence,
                        "track.time_signature": audioData.track.time_signature,
                        "track.time_signature_confidence": audioData.track.time_signature_confidence,
                        "track.key": audioData.track.key,
                        "track.key_confidence": audioData.track.key_confidence,
                        "track.mode": audioData.track.mode,
                        "track.mode_confidence": audioData.track.mode_confidence,
                    },
                },
            };

            console.log(postData);
            try {
                const response = await axios.post(endpoint, postData, { headers: headers });
                setPred(response.data.prediction);
                handleShowModal();
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <Card className="border-0">
            <Card.Body style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Card.Img variant="top" src="/spotify.png" style={{ width: '340px', height: '340px' }} />
            </Card.Body>
            <Card.Body>
                <Card.Title className="fw-bold display-6 pb-4">Spotify Music Popularity</Card.Title>
                <Card.Text>
                    <p className="pb-3">Drop in a spotify URL to see how popular a song is.
                    This plugin was built to showcase that data doesn't have to be ingested through forms.
                    It can be ingested in different ways like making API calls to other services gather data. </p>
                    <p className="text-danger">This is a low accuracy model only meant to illustrate automated data pipelines using external APIs.</p>
                    <Form>
                        <Row className="pt-2">
                            <Col>
                                <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltip("In the Spotify app, find a song, click the three dots, click share, and then click copy link")}
                                >
                                    <FloatingLabel controlId="floatingInput" label="Spotify URL">
                                        <Form.Control type="text" placeholder="url" onChange={selectUrl} />
                                    </FloatingLabel>
                                </OverlayTrigger>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Button variant="success" onClick={predict}>Check Now</Button>
                        </Row>
                    </Form>
                    {/* Display error message */}
                    {errorMessage && (
                        <div className="text-danger">{errorMessage}</div>
                    )}
                </Card.Text>
            </Card.Body>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title className="custom-color">Prediction</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Spotify Popularity Score: <strong>{pred}.</strong> According to Spotify, the popularity of a track is a value between 0 and 100, 
                    with 100 being the most popular. The popularity is calculated by algorithm and is based, in the most part, on the total number of plays the 
                    track has had and how recent those plays are.</p>
                </Modal.Body>
            </Modal>
        </Card>
    )
}
export default SpotifyPop;