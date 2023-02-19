import React from 'react';

// React.Lazy()
const Home = React.lazy(() => import('./Home'));
const ProductList = React.lazy(() => import('./Product/List'));
const ProductSingle = React.lazy(() => import('./Product/Single'));
const ProductCreate = React.lazy(() => import('./Product/Create'));
const ProductUpdate = React.lazy(() => import('./Product/Update'));

// Route Config JSON
const routes = [
  { path: '/products/update/:productId', Component: ProductUpdate },
  { path: '/products/create', Component: ProductCreate },
  { path: '/products/single/:productId', Component: ProductSingle },
  { path: '/products', Component: ProductList },
  { path: '/', Component: Home },
];

export default routes;
