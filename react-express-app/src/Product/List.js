import React from 'react';
import axios from 'axios';

const List = () => {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products');
        // console.log(response.data);

        const { status, message, data } = response.data;

        // handle data list product
        if (status === 'success') {
          // console.log(data);
          setProducts(data);
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

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </>
  );
};

export default List;
