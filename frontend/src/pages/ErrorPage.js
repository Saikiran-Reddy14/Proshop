import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <Container className="d-flex flex-column align-items-center text-center mt-5">
      <h1 className="display-4">404</h1>
      <p className="lead">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/">
        <Button variant="primary" className="mt-3">
          Go Back Home
        </Button>
      </Link>
    </Container>
  );
};

export default ErrorPage;
