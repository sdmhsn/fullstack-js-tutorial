import React from 'react';

import {
  SideNav,
  LayoutSidebar,
  Responsive,
  CardProduct,
  Pagination,
  InputText,
  Pill,
} from 'upkit';

import menus from './menus';
import { tags } from './tags';

import { TopBar } from '../../components/TopBar';
import { Cart } from '../../components/Cart';
import { config } from '../../config';
import { addItem } from '../../features/Cart/actions';
import { removeItem } from '../../features/Cart/actions';

import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import BounceLoader from 'react-spinners/BounceLoader';

import {
  fetchProducts,
  setPage,
  goToNextPage,
  goToPrevPage,
  setKeyword,
  setCategory,
  toggleTag,
} from '../../features/Products/actions';

//  Use export default for normal function. This <Home> component is writing by normal function.
export default function Home() {
  let products = useSelector((state) => state.products);
  // console.log(products);
  /* Output products (page 15 / last page):
  {
    "data": [
      {
        "_id": "5f08d5b9a9c6cd7146ea8039",
        "price": 11000,
        "discount": 0,
        "tags": [],
        "name": "Chips",
        "category": {
          "_id": "5f083558e0495436721eeb67",
          "name": "Snack",
          "__v": 0
        },
        "image_url": "b20ecb0cfd685ec3b8eba6a090d2394f.png",
        "__v": 0
      },
      {
        "_id": "5f08d5d0a9c6cd7146ea803a",
        "price": 17000,
        "discount": 0,
        "tags": [],
        "name": "Cheese Fruit",
        "category": {
          "_id": "5f083558e0495436721eeb67",
          "name": "Snack",
          "__v": 0
        },
        "image_url": "782e46f83fbe1e1b054c9cf86d09213f.png",
        "__v": 0
      },
      {
        "_id": "5f08d5e7a9c6cd7146ea803b",
        "price": 6000,
        "discount": 0,
        "tags": [],
        "name": "Hot Tea",
        "category": {
          "_id": "5f083551e0495436721eeb66",
          "name": "Minuman",
          "__v": 0
        },
        "image_url": "291ebc245b16b964909b8bce7ee48161.png",
        "__v": 0
      },
      {
        "_id": "5f08d5f6a9c6cd7146ea803c",
        "price": 8000,
        "discount": 0,
        "tags": [],
        "name": "Ice Tea",
        "category": {
          "_id": "5f083551e0495436721eeb66",
          "name": "Minuman",
          "__v": 0
        },
        "image_url": "8dad3a4c4395dc9203efe40160ddb7fd.png",
        "__v": 0
      }
    ],
    "currentPage": 15,
    "totalItems": 88,
    "perPage": 6,
    "keyword": "",
    "category": "",
    "tags": [],
    "status": "success"
  }
  */

  let dispatch = useDispatch();

  // let [active, setActive] = React.useState(''); // active = '' / 'utama' / 'minuman' / 'snack' / 'pastry'

  let cart = useSelector((state) => state.cart);

  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, [
    dispatch,
    products.currentPage,
    products.keyword,
    products.category,
    products.tags,
  ]);

  // console.log(tags);

  return (
    <div>
      <LayoutSidebar
        sidebar={
          <SideNav
            items={menus}
            verticalAlign="top"
            // active={active}
            // onChange={(id) => (setActive(id), dispatch(setCategory(id)))}
            active={products.category}
            onChange={(id) => dispatch(setCategory(id))}
          />
        }
        content={
          <div className="md:flex w-full h-full mr-5 min-h-screen md:flex-row-reverse">
            <div className="md:w-3/4 w-full pl-5 pb-10">
              <TopBar />

              <div className="w-full text-center mb-10 mt-5">
                <InputText
                  fullRound
                  value={products.keyword}
                  placeholder="cari makanan favoritmu..."
                  fitContainer
                  onChange={(e) => {
                    dispatch(setKeyword(e.target.value));
                  }}
                />
              </div>

              <div className="mb-5 pl-2 flex w-3/3 overflow-auto pb-5">
                {/* {console.log(products.category)} */}
                {/* e.g.: products.category: ''/ 'utama' / 'minuman' / 'snack' / 'pastry' */}

                {/* {console.log(tags[products.category])} */}
                {/* e.g.: tags[products.category] products.category ---> 'utama' : ['burger', 'pizza', 'bread']  */}
                {tags[products.category].map((tag, index) => {
                  // console.log(tag); // e.g.: utama ---> 'burger' / 'pizza' / 'bread'
                  return (
                    <div key={index}>
                      <Pill
                        text={tag}
                        icon={tag.slice(0, 1).toUpperCase()} // e.g.: B -> burger / P -> pizza / B -> bread
                        isActive={products.tags.includes(tag)} // turn to active (red)
                        onClick={() => dispatch(toggleTag(tag))} // e.g.: {type: TOGGLE_TAG, tag}
                      />
                    </div>
                  );
                })}
              </div>

              {/* {products.status === 'process' && !products.data.length ? (
                <div className="flex justify-center">
                  <BounceLoader color="red" />
                </div>
              ) : null} */}

              {products.status === 'process' && !products.data.length && (
                <div className="flex justify-center">
                  <BounceLoader color="red" />
                </div>
              )}

              <Responsive desktop={3} items="stretch">
                {/* including not found product */}
                {products.status === 'success' &&
                (!products.data || !products.data.length) ? (
                  <div className="p-2">Product Not Found</div>
                ) : (
                  products.data.map((product, index) => {
                    // console.log(product); // e.g. one data : { "tags": [], "_id": "63fafa800404b0cedbecfa2c", "name": "Product 1", "description": "a product description", "price": 5000, "image_url": "369b09c6765c42b61ce4f1887ba4cc04.jpg", "createdAt": "2023-03-07T04:16:18.277Z", "updatedAt": "2023-03-07T04:16:18.277Z", "__v": 0 } etc...
                    return (
                      <div key={index} className="p-2">
                        <CardProduct
                          title={product.name}
                          imgUrl={`${config.api_host}/upload/${product.image_url}`}
                          price={product.price}
                          onAddToCart={() => dispatch(addItem(product))} // dispatch({type: ADD_ITEM, { "tags": [], "_id": "63fafa800404b0cedbecfa2c", "name": "Product 1", "description": "a product description", "price": 5000, "image_url": "369b09c6765c42b61ce4f1887ba4cc04.jpg", "createdAt": "2023-03-07T04:16:18.277Z", "updatedAt": "2023-03-07T04:16:18.277Z", "__v": 0 }})
                        />
                      </div>
                    );
                  })
                )}

                {/* 
                without not found
                {products.data.map((product, index) => {
                  return (
                    <div key={index} className="p-2">
                      <CardProduct
                        title={product.name}
                        imgUrl={`${config.api_host}/upload/${product.image_url}`}
                        price={product.price}
                        onAddToCart={() => null}
                      />
                    </div>
                  );
                })} 
                */}

                {/* {console.log(products.status)} */}
              </Responsive>

              <div className="text-center my-10">
                <Pagination
                  totalItems={products.totalItems}
                  page={products.currentPage}
                  perPage={products.perPage}
                  onChange={(page) => dispatch(setPage(page))}
                  onNext={() => dispatch(goToNextPage())}
                  onPrev={() => dispatch(goToPrevPage())}
                />
              </div>
            </div>

            <div className="md:w-1/4 w-full h-full shadow-lg border-r border-white bg-gray-100">
              <Cart
                items={cart}
                onItemInc={(item) => dispatch(addItem(item))}
                onItemDec={(item) => dispatch(removeItem(item))}
                onCheckout={() => {
                  navigate('/checkout');
                }}
              />
            </div>
          </div>
        }
        sidebarSize={80}
      />
    </div>
  );
}
