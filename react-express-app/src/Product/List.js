import React from 'react';
import axios from 'axios';

const List = () => {
  React.useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products');
        // console.log(response.data);

        const { status, message, data } = response.data;

        // handle data list product
        if (status === 'success') {
          console.log(data);
        } else {
          throw Error(message);
        }
      } catch (error) {
        alert(error.message);
      }
    };

    getProducts();
  }, []); // no dependency required

  return (
    <>
      <h2>Products List Page</h2>
    </>
  );
};

export default List;
