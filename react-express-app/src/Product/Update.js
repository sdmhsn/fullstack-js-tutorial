import React from 'react';

const Update = () => {
  const handleInputChange = (event) => {};

  return (
    <>
      <h2>Update Product Form Page</h2>

      <form>
        <label htmlFor="product_name">Name:</label>
        <input
          type="text"
          id="product_name"
          name="name"
          onChange={handleInputChange}
        />

        <label htmlFor="product_price">Price:</label>
        <input
          type="number"
          id="product_price"
          name="price"
          onChange={handleInputChange}
        />

        <label htmlFor="product_stock">Stock:</label>
        <input
          type="number"
          id="product_stock"
          name="stock"
          onChange={handleInputChange}
        />

        <label>Status:</label>
        <div>
          <input
            type="radio"
            name="status"
            id="on"
            onChange={handleInputChange}
          />
          <label htmlFor="on">On</label>
          <input
            type="radio"
            name="status"
            id="off"
            onChange={handleInputChange}
          />
          <label htmlFor="off">Off</label>
        </div>

        <button>Submit</button>
      </form>
    </>
  );
};

export default Update;
