import axios from 'axios';

export const FETCH_COWORKING_SPACES_REQUEST = 'FETCH_COWORKING_SPACES_REQUEST';
export const FETCH_COWORKING_SPACES_SUCCESS = 'FETCH_COWORKING_SPACES_SUCCESS';
export const FETCH_COWORKING_SPACES_FAILURE = 'FETCH_COWORKING_SPACES_FAILURE';

export const fetchCoworkingSpaces = (userId) => async (dispatch) => {
  dispatch({ type: FETCH_COWORKING_SPACES_REQUEST });
  try {
    const response = await axios.get(`https://smart-coworking-857b32bb5cda.herokuapp.com/api/v1/users/${userId}/space_cws`);
    dispatch({
      type: FETCH_COWORKING_SPACES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_COWORKING_SPACES_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_COWORKING_SPACE_REQUEST = 'FETCH_COWORKING_SPACE_REQUEST';
export const FETCH_COWORKING_SPACE_SUCCESS = 'FETCH_COWORKING_SPACE_SUCCESS';
export const FETCH_COWORKING_SPACE_FAILURE = 'FETCH_COWORKING_SPACE_FAILURE';

export const fetchCoworkingSpace = (spaceId) => async (dispatch) => {
  dispatch({ type: FETCH_COWORKING_SPACE_REQUEST });
  try {
    const response = await axios.get(`https://smart-coworking-857b32bb5cda.herokuapp.com/api/v1/space_cws/${spaceId}`);
    dispatch({
      type: FETCH_COWORKING_SPACE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_COWORKING_SPACE_FAILURE,
      payload: error.message,
    });
  }
};
