import React from 'react';

const Create = () => {
  const [product, setProduct] = React.useState({
    name: '',
    price: 0,
    stock: 0,
    status: false, // default chacked off
  });

  return (
    <>
      <h2>Create Product Form Page</h2>

      <form>
        <label htmlFor="product_name">Name:</label>
        <input type="text" id="product_name" name="name" />

        <label htmlFor="product_price">Price:</label>
        <input type="number" id="product_price" name="price" />

        <label htmlFor="product_stock">Stock:</label>
        <input type="number" id="product_stock" name="stock" />

        <label>Status:</label>
        <div>
          <input type="radio" name="status" id="on" />
          <label htmlFor="on">On</label>
          <input type="radio" name="status" id="off" />
          <label htmlFor="off">Off</label>
        </div>

        <button>Submit</button>
      </form>
    </>
  );
};

export default Create;
