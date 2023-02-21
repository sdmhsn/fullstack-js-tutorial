import React from 'react';

const Update = () => {
  return (
    <>
      <h2>Update Product Form Page</h2>

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

export default Update;
