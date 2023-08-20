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

const statusList = {
  idle: 'idle',
  process: 'process',
  success: 'success',
  error: 'error',
};

let initialState = {
  data: [],
  currentPage: 1,
  totalItems: -1,
  perPage: 6,
  keyword: '',
  category: '',
  tags: [],
  status: statusList.idle,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_FETCHING_PRODUCT:
      return { ...state, status: statusList.process };
    case ERROR_FETCHING_PRODUCT:
      return { ...state, status: statusList.error };
    case SUCCESS_FETCHING_PRODUCT:
      return {
        ...state,
        status: statusList.success,
        data: action.data,
        totalItems: action.count,
      };
    case SET_PAGE:
      return { ...state, currentPage: action.currentPage };
    case SET_CATEGORY:
      return {
        ...state,
        currentPage: 1,
        tags: [],
        category: action.category,
        keyword: '',
      };
    case SET_KEYWORD:
      return { ...state, keyword: action.keyword, category: '', tags: [] };
    case NEXT_PAGE:
      return { ...state, currentPage: state.currentPage + 1 };
    case PREV_PAGE:
      return { ...state, currentPage: state.currentPage - 1 };
    case TOGGLE_TAG:
      console.log(action.tag); // e.g: action.tag = 'burger' / 'pizza' / 'bread' / etc...
      console.log(state.tags); // [] or ['burger', 'pizza'] / etc...
      // .includes() output = true / false
      if (!state.tags.includes(action.tag)) {
        // true
        return { ...state, currentPage: 1, tags: [...state.tags, action.tag] }; // ...state.tags for toggle the tag
      } else {
        // false
        return {
          ...state,
          currentPage: 1,
          tags: state.tags.filter((tag) => tag !== action.tag), // create new 'tags' array except action.tag
        };
      }
    default:
      return state;
  }
};

export default productReducer;
