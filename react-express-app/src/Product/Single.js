import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Single = () => {
  const [product, setProduct] = React.useState({});
  const { productId } = useParams(); // productId: related to /products/single/:productId path in routes

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

  // console.log(productId);
  console.log(product);

  return (
    <>
      <h2>Single Product Page</h2>
    </>
  );
};

export default Single;
