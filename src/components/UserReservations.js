import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserReservations, deleteReservation } from '../actions/reservationActions';
import '../assets/css/UserReservations.css';
import API_BASE_URL from '../constants';

const UserReservations = ({ userId }) => {
  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.reservation.reservations);
  const [spaceCwNames, setSpaceCwNames] = useState({});
  const [cityNames, setCityNames] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserReservations(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    const fetchSpaceCwNames = async () => {
      const jwt = JSON.parse(localStorage.getItem('user'))?.jwt;
      try {
        const names = {};
        await Promise.all(reservations.map(async (reservation) => {
          const response = await axios.get(`${API_BASE_URL}api/v1/space_cws/${reservation.space_cw_id}`, {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          });
          names[reservation.id] = response.data.name;
        }));
        setSpaceCwNames(names);
      } catch (error) {
        setError('space coworking names:');
      }
    };

    if (reservations && reservations.length > 0) {
      fetchSpaceCwNames();
    }
  }, [reservations]);

  useEffect(() => {
    const fetchCityNames = async () => {
      const jwt = JSON.parse(localStorage.getItem('user'))?.jwt;
      try {
        const names = {};
        await Promise.all(reservations.map(async (reservation) => {
          const response = await axios.get(`${API_BASE_URL}api/v1/cities/${reservation.city_id}`, {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          });
          names[reservation.id] = response.data.name;
        }));
        setCityNames(names);
      } catch (error) {
        setError('Error fetching city names:');
      }
    };

    if (reservations && reservations.length > 0) {
      fetchCityNames();
    }
  }, [reservations]);

  const handleDelete = (userId, reservationId) => {
    dispatch(deleteReservation(userId, reservationId));
  };

  return (
    <div className="container">
      <div className="card-container">
        <h2>My Reservations</h2>
        <p className="p-center">
          Nr. of Reservations:&nbsp;
          {reservations && reservations.length}
        </p>
        <div>
          {reservations && reservations.length > 0 ? (
            <ul className="ul">
              {reservations.map((reservation) => (
                <li key={reservation.id} className="card">
                  <p>
                    Coworking Space Name:&nbsp;
                    <span className="strong">{spaceCwNames[reservation.id]}</span>
                  </p>

                  <p>
                    Date Reserved:&nbsp;
                    <span className="strong">{reservation.date_reserved}</span>
                  </p>

                  <p>
                    Start Date:&nbsp;
                    <span className="strong">{reservation.start_date}</span>
                  </p>

                  <p>
                    End Date:&nbsp;
                    <span className="strong">{reservation.end_date}</span>
                  </p>

                  <p>
                    City Name:&nbsp;
                    <span className="strong">{cityNames[reservation.id]}</span>
                  </p>

                  <p>
                    Comments:&nbsp;
                    <span className="strong">{reservation.comments}</span>
                  </p>

                  <div className="btn-container">
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => handleDelete(reservation.user_id,
                        reservation.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reservations found.</p>
          )}
        </div>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

UserReservations.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default UserReservations;
