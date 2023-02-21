import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Single = () => {
  const [product, setProduct] = React.useState({});
  const { productId } = useParams(); // productId: related to /products/single/:productId path in routes
  const navigate = useNavigate(); // use useNavigate() in v6 instead of useHistory() in v5.

  React.useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/product/${productId}`
        );
        // console.log(response.data);

        const { status, message, data } = response.data; // response.data: .data is axios property, not the 'data' key from backend

        if (status === 'success') {
          // console.log(data); // data 'key' from backend
          setProduct(data);
        } else {
          throw Error(message);
        }
      } catch (error) {
        alert(error.message);
      }
    };

    getProduct();
  }, [productId]);

  const handleDeleteProduct = async () => {
    if (window.confirm('Delete this product?')) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/product/${productId}`
        );

        const { status, message } = response.data;

        if (status === 'success') {
          alert(message);
          navigate('/products');
        } else {
          throw Error(message);
        }
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert('Delete product pending');
    }
  };

  // console.log(productId);
  // console.log(product);

  return (
    <>
      <h2>Single Product Page</h2>

      {product && (
        <>
          <div>Name: {product.name}</div>
          <div>Price: {product.price}</div>
          <div>Stock: {product.stock}</div>
          <div>Status: {product.status ? 'on' : 'off'}</div>
        </>
      )}
      <button onClick={() => navigate('/products')}>&laquo; Back</button>

      <button onClick={handleDeleteProduct}>Delete</button>
    </>
  );
};

export default Single;
