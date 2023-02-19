const axios = require('axios');

const getProducts = async () => {
  try {
    const response = await axios.get('http://localhost:3000/products'); // cors middleware in Express web server (backend) required
    console.log(response.data.data);
  } catch (error) {
    console.error(error);
  }
};

getProducts();

// run this code using node axios.js
