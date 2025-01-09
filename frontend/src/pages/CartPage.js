import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../slices/cartSlice';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let { cartItems } = useSelector((state) => state.cart);

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <>
      <Row>
        <Col md={12}>
          <h1 style={{ marginBottom: '20px' }}>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty <Link to={'/'}>Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row>
                    <Col md={2} className="m-1">
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3} className="m-1">
                      <Link
                        to={`/product/${item._id}`}
                        style={{ textDecoration: 'none' }}
                      >
                        {item.name}
                      </Link>
                    </Col>
                    <Col md={2} className="m-1">
                      <strong>₹{item.price}</strong>
                    </Col>
                    <Col md={2} className="m-1">
                      <Row>
                        <Col>
                          <Form.Control
                            as="select"
                            value={item.qty}
                            onChange={(e) => {
                              addToCartHandler(item, Number(e.target.value));
                            }}
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => dispatch(removeFromCart(item._id))}
                      >
                        <FaTrash />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
      </Row>
      <Row>
        <Col className="mt-5" md={6}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>
                  Subtotal (
                  {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)})
                  items
                </h2>
                ₹
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CartPage;
