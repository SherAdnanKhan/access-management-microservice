import React from 'react'
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
    return (
        <footer className='fixed-bottom'>
            <Container>
                <Row>
                    <Col className='text-center py-3'>
                        CopyRight &copy; 2022
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer