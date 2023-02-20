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
    </>
  );
};

export default Create;
