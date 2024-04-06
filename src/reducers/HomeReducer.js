import { FETCH_COWORKING_SPACES_REQUEST, FETCH_COWORKING_SPACES_SUCCESS, FETCH_COWORKING_SPACES_FAILURE } from '../actions/homeActions';

const initialState = {
  coworkingSpaces: [],
  loading: false,
  error: null,
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COWORKING_SPACES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_COWORKING_SPACES_SUCCESS:
      return {
        ...state,
        coworkingSpaces: action.payload,
        loading: false,
      };
    case FETCH_COWORKING_SPACES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default homeReducer;
