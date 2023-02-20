import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
            <th>No.</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product, index) => (
              <tr key={product._id}>
                {/* preferred using product id for key value instead using index parameter in map() */}
                <td className="no">{index + 1}</td>
                <td>
                  <Link to={`/products/single/${product._id}`}>
                    {product.name}
                  </Link>
                </td>
                <td className="center">{product.price}</td>
                <td className="center">{product.stock}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default List;
