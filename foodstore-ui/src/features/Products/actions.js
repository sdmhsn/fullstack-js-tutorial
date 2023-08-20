import {
  START_FETCHING_PRODUCT,
  ERROR_FETCHING_PRODUCT,
  SUCCESS_FETCHING_PRODUCT,
  SET_PAGE,
  SET_CATEGORY,
  SET_KEYWORD,
  NEXT_PAGE,
  PREV_PAGE,
  TOGGLE_TAG,
} from './constants';

import { getProducts } from '../../api/products';

import debounce from 'debounce-promise';

const startFetchingProducts = () => {
  return {
    type: START_FETCHING_PRODUCT,
  };
};

const errorFetchingProducts = () => {
  return {
    type: ERROR_FETCHING_PRODUCT,
  };
};

const successFetchingProducts = ({ data, count }) => {
  return {
    type: SUCCESS_FETCHING_PRODUCT,
    data,
    count,
  };
};

let debouncedFetchProducts = debounce(getProducts, 1000);

const fetchProducts = () => {
  return async (dispatch, getState) => {
    dispatch(startFetchingProducts());

    let perPage = getState().products.perPage || 9; // || source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#logical_operators
    let currentPage = getState().products.currentPage || 1;
    let tags = getState().products.tags || [];
    let keyword = getState().products.keyword || '';
    let category = getState().products.category || '';

    const params = {
      limit: perPage,
      skip: keyword ? 0 : currentPage * perPage - perPage,
      q: keyword,
      category,
      tags,
    };

    try {
      let {
        data: { data, count },
      } = await debouncedFetchProducts(params);

      // console.log(params.q);
      // console.log(data);

      // if (data === undefined) {
      //   data = []; // backend response --> return res.json({ status: 'warning', message: 'Products empty! :)'  });
      // }

      dispatch(successFetchingProducts({ data, count }));
    } catch (error) {
      dispatch(errorFetchingProducts());
    }
  };
};

const setPage = (number = 1) => {
  return {
    type: SET_PAGE,
    currentPage: number,
  };
};

const setKeyword = (keyword) => {
  return {
    type: SET_KEYWORD,
    keyword,
  };
};

const setCategory = (category) => {
  return {
    type: SET_CATEGORY,
    category,
  };
};

const toggleTag = (tag) => {
  return {
    type: TOGGLE_TAG,
    tag,
  };
};

const goToNextPage = () => {
  return {
    type: NEXT_PAGE,
  };
};

const goToPrevPage = () => {
  return {
    type: PREV_PAGE,
  };
};

export {
  startFetchingProducts,
  errorFetchingProducts,
  fetchProducts,
  setPage,
  setKeyword,
  setCategory,
  toggleTag,
  goToNextPage,
  goToPrevPage,
};
