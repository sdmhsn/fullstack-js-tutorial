import React from 'react';

const Update = () => {
  const [product, setProduct] = React.useState({
    name: '',
    price: '',
    stock: '',
    status: true,
  }); // controlled component, each input form should filled with its own value. properties required inside state.

  const handleInputChange = (event) => {
    if (event.target.type === 'number') {
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

  console.log(product);

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
