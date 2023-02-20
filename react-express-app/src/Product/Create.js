import React from 'react';
import axios from 'axios';

const Create = () => {
  const [product, setProduct] = React.useState({
    name: '',
    price: '',
    stock: '',
    status: false, // default chacked off
  });

  const handleInputChange = (event) => {
    if (event.target.name === 'status') {
      // target by name. for status (radio) input field
      setProduct({
        ...product,
        [event.target.name]: event.target.value === 'true' ? true : false, // status value output from radio  is 'true' (string not boolean). this command convert the 'true' value into boolean
      });
    } else if (event.target.type === 'number') {
      // target by type. for price and stock (number) input fields
      setProduct({
        ...product,
        [event.target.name]: Number(event.target.value), // price and stock output values from input number fields are string not number. this command convert the string value into number
      });
    } else {
      // for name (text) input field
      setProduct({
        ...product,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // console.log(product);

    try {
      const response = await axios.post(
        'http://localhost:3000/product',
        product,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      // console.log(response.data);

      const { status, message } = response.data;

      if (status === 'success') {
        alert(message);
      } else {
        throw Error(message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <h2>Create Product Form Page</h2>

      <form onSubmit={handleFormSubmit}>
        <label htmlFor="product_name">Name:</label>
        <input
          type="text"
          id="product_name"
          name="name"
          onChange={handleInputChange}
          value={product.name}
        />

        <label htmlFor="product_price">Price:</label>
        <input
          type="number"
          id="product_price"
          name="price"
          onChange={handleInputChange}
          value={product.price}
        />

        <label htmlFor="product_stock">Stock:</label>
        <input
          type="number"
          id="product_stock"
          name="stock"
          onChange={handleInputChange}
          value={product.stock}
        />

        <label>Status:</label>
        <div>
          <input
            type="radio"
            name="status"
            id="on"
            onChange={handleInputChange}
            value={true}
            checked={product.status === true}
          />
          <label htmlFor="on">On</label>
          <input
            type="radio"
            name="status"
            id="off"
            onChange={handleInputChange}
            value={false}
            checked={product.status === false}
          />
          <label htmlFor="off">Off</label>
        </div>

        <button>Submit</button>
      </form>
    </>
  );
};

export default Create;
