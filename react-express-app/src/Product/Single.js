import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Single = () => {
  const { productId } = useParams(); // productId: related to /products/single/:productId path in routes

  return (
    <>
      <h2>Single Product Page</h2>
    </>
  );
};

export default Single;
