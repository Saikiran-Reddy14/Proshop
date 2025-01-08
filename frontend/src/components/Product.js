import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const calculateTotalPrice = (price) => {
  const itemsPrice = price;
  const shippingPrice = itemsPrice >= 500 ? 0 : 99;
  const taxPrice = (0.18 * itemsPrice).toFixed(0);

  return Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice);
};

const Product = ({ product }) => {
  return (
    <>
      <Card className="my-3 p-3 rounded">
        <Link to={`/product/${product._id}`}>
          <Card.Img src={product.image} variant="top" />
        </Link>
        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title as={'div'} className="product-title">
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>
          <Card.Text as={'div'}>
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </Card.Text>
          <Card.Text as={'h3'} className="mt-1">
            ₹{calculateTotalPrice(product.price)}
          </Card.Text>
          <Button className="mt-1">Add to Cart</Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default Product;
