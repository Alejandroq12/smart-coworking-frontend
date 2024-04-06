import axios from 'axios';
import API_BASE_URL from '../constants';

export const CREATE_RESERVATION_REQUEST = 'CREATE_RESERVATION_REQUEST';
export const CREATE_RESERVATION_SUCCESS = 'CREATE_RESERVATION_SUCCESS';
export const CREATE_RESERVATION_FAILURE = 'CREATE_RESERVATION_FAILURE';

export const FETCH_USER_RESERVATIONS_REQUEST = 'FETCH_USER_RESERVATIONS_REQUEST';
export const FETCH_USER_RESERVATIONS_SUCCESS = 'FETCH_USER_RESERVATIONS_SUCCESS';
export const FETCH_USER_RESERVATIONS_FAILURE = 'FETCH_USER_RESERVATIONS_FAILURE';

export const DELETE_RESERVATION_REQUEST = 'DELETE_RESERVATION_REQUEST';
export const DELETE_RESERVATION_SUCCESS = 'DELETE_RESERVATION_SUCCESS';
export const DELETE_RESERVATION_FAILURE = 'DELETE_RESERVATION_FAILURE';

export const createReservationRequest = () => ({
  type: CREATE_RESERVATION_REQUEST,
});

export const createReservationSuccess = (reservation) => ({
  type: CREATE_RESERVATION_SUCCESS,
  payload: reservation,
});

export const createReservationFailure = (error) => ({
  type: CREATE_RESERVATION_FAILURE,
  payload: error,
});

export const createReservation = (reservationData) => async (dispatch) => {
  dispatch(createReservationRequest());
  const jwt = JSON.parse(localStorage.getItem('user'))?.jwt;
  try {
    const response = await axios.post(`${API_BASE_URL}api/v1/users/:user_id/reservations`, { reservation: reservationData }, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch(createReservationSuccess(response.data));
  } catch (error) {
    dispatch(createReservationFailure(error.message));
  }
};

export const fetchUserReservations = (userId) => async (dispatch) => {
  const jwt = JSON.parse(localStorage.getItem('user'))?.jwt;
  try {
    const response = await axios.get(`${API_BASE_URL}api/v1/users/${userId}/reservations`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch({ type: 'FETCH_USER_RESERVATIONS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_USER_RESERVATIONS_FAILURE', payload: error.message });
  }
};

export const deleteReservation = (userId, reservationId) => async (dispatch) => {
  const jwt = JSON.parse(localStorage.getItem('user'))?.jwt;
  try {
    await axios.delete(`${API_BASE_URL}api/v1/users/${userId}/reservations/${reservationId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch({ type: 'DELETE_RESERVATION_SUCCESS', payload: reservationId });
  } catch (error) {
    dispatch({ type: 'DELETE_RESERVATION_FAILURE', payload: error.message });
  }
};
