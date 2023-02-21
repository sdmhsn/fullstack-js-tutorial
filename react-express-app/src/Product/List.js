import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const List = () => {
  const [products, setProducts] = React.useState([]);
  const navigate = useNavigate();

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

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Delete this product?')) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/product/${id}`
        );

        const { status, message } = response.data;

        if (status === 'success') {
          alert(message); // the alert or the other functions being called twice because the root component (<App />) in index.js, is wrap by <React.StrictMode>
          navigate(0); // reload same page works!
          // return redirect('/products'); // using redirect() to reload same page failed
          // return <Navigate to="/products" replace />; // using <Navigate /> to reload same page failed
        } else {
          throw Error(message);
        }
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert('Delete product pending');
    }
  };

  return (
    <>
      <h2>Products List Page</h2>

      <Link to={'/products/create'}>+ CREATE</Link>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Action</th>
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
                <td className="center">
                  <Link to={`/products/update/${product._id}`}>Update</Link> |{' '}
                  <Link onClick={() => handleDeleteProduct(product._id)}>
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default List;
