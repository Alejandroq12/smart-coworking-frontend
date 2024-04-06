import axios from 'axios';
import API_BASE_URL from '../constants';

export const FETCH_COWORKING_SPACES_REQUEST = 'FETCH_COWORKING_SPACES_REQUEST';
export const FETCH_COWORKING_SPACES_SUCCESS = 'FETCH_COWORKING_SPACES_SUCCESS';
export const FETCH_COWORKING_SPACES_FAILURE = 'FETCH_COWORKING_SPACES_FAILURE';

export const fetchCoworkingSpaces = () => async (dispatch) => {
  dispatch({ type: FETCH_COWORKING_SPACES_REQUEST });
  const jwt = JSON.parse(localStorage.getItem('user'))?.jwt;
  try {
    const response = await axios.get(`${API_BASE_URL}api/v1/coworking_spaces`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
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
  const jwt = JSON.parse(localStorage.getItem('user'))?.jwt;
  try {
    const response = await axios.get(`${API_BASE_URL}api/v1/space_cws/${spaceId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
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
