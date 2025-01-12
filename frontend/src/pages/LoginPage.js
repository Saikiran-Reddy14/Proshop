import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();

    if (!email && !password) {
      setError('Both email and password are required');
      return;
    } else if (!email) {
      setError('Please enter your email');
      return;
    } else if (!password) {
      setError('Please enter your password');
      return;
    }

    // Successful form submission
    console.log('submitted', email, password);
    setEmail('');
    setPassword('');
    setError('');
  };

  return (
    <FormContainer>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password" className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-2">
          Submit
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Don't have an account? <Link to="/register">Register</Link>
        </Col>
      </Row>
      {error && <Message variant="danger">{error}</Message>}
    </FormContainer>
  );
};

export default LoginPage;
