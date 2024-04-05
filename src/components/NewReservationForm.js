import axios from 'axios';
import React, { useState, useEffect } from 'react';
import '../assets/css/newreservation.css';
import styles from '../assets/stylesheets/NewReservationForm.module.css';
import API_BASE_URL from '../constants';

const NewReservationForm = () => {
  const userId = JSON.parse(localStorage.getItem('user'))?.user.id;
  const [formData, setFormData] = useState({
    user_id: userId,
    space_cw_id: '',
    date_reserved: '',
    date_cancelled: '',
    start_date: '',
    end_date: '',
    start_time: '',
    end_time: '',
    city_id: '',
    comments: '',
  });

  const [spaceCws, setSpaceCws] = useState([]);
  const [cities, setCities] = useState([]);

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('user'))?.user.id;
    setFormData((prevFormData) => ({ ...prevFormData, user_id: userId }));
  }, []);

  const fetchSpaceCws = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}api/v1/coworking_spaces`);
      setSpaceCws(response.data);
      const cityIds = response.data.map((spaceCw) => spaceCw.city_id);
      setFormData((prevFormData) => ({
        ...prevFormData,
        city_id: cityIds[0] || '',
      }));
    } catch (error) {
      setError('Error fetching Space_cws:');
    }
  };

  useEffect(() => {
    fetchSpaceCws();
  }, [formData.user_id]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}api/v1/all_cities`);
        setCities(response.data);
      } catch (error) {
        setError('Error fetching cities:');
      }
    };
    fetchCities();
  }, []);

  const handleChange = (e) => {
    const userId = JSON.parse(localStorage.getItem('user'))?.user.id;
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      user_id: userId,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}api/v1/users/:user_id/reservations`, formData);
      setSuccessMessage('Reservation created successfully!');
      setFormData({
        user_id: userId,
        space_cw_id: '',
        date_reserved: '',
        date_cancelled: '',
        start_date: '',
        end_date: '',
        start_time: '',
        end_time: '',
        city_id: '',
        comments: '',
      });
      fetchSpaceCws();
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000); // 5 seconds
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Error creating reservation. Please try again later.');
      setTimeout(() => {
        setErrorMessage('');
      }, 8000); // 8 seconds
      setSuccessMessage('');
    }
  };

  return (
    <div className={styles.mainDiv}>
      <div className={styles.mainDivOverlay}>
        <h2 className={styles.newReservationTitle}>Create a New Reservation</h2>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <label htmlFor="user_id" className={styles.formLabel}>
            User ID (Auto-filled):
            <input
              type="number"
              name="user_id"
              className={styles.formField}
              value={formData.user_id}
              readOnly
            />
          </label>
          <br />

          <label htmlFor="space_cw_id" className={styles.formLabel}>
            Choose a Workspace:
            <select
              id="space_cw_id"
              name="space_cw_id"
              className={styles.formField}
              value={formData.space_cw_id}
              onChange={handleChange}
              required
            >
              <option value="">Select a Workspace</option>
              {spaceCws.map((spaceCw) => (
                <option key={spaceCw.id} value={spaceCw.id}>
                  {spaceCw.name}
                </option>
              ))}
            </select>
          </label>
          <br />

          <label htmlFor="date_reserved" className={styles.formLabel}>
            Reservation Date:
            <input
              type="date"
              id="date_reserved"
              name="date_reserved"
              className={styles.formField}
              value={formData.date_reserved}
              onChange={handleChange}
              required
            />
          </label>
          <br />

          <label htmlFor="date_cancelled" className={styles.formLabel}>
            Cancellation Date (Optional):
            <input
              type="date"
              id="date_cancelled"
              name="date_cancelled"
              className={styles.formField}
              value={formData.date_cancelled}
              onChange={handleChange}
            />
          </label>
          <br />

          <label htmlFor="start_date" className={styles.formLabel}>
            Start Date:
            <input
              type="date"
              id="start_date"
              name="start_date"
              className={styles.formField}
              value={formData.start_date}
              onChange={handleChange}
              required
            />
            <br />
          </label>

          <label htmlFor="end_date" className={styles.formLabel}>
            End Date:
            <input
              type="date"
              id="end_date"
              name="end_date"
              className={styles.formField}
              value={formData.end_date}
              onChange={handleChange}
              required
            />
          </label>
          <br />

          <label htmlFor="start_time" className={styles.formLabel}>
            Start Time:
            <input
              type="time"
              id="start_time"
              name="start_time"
              className={styles.formField}
              value={formData.start_time}
              onChange={handleChange}
              required
            />
          </label>
          <br />

          <label htmlFor="end_time" className={styles.formLabel}>
            End Time:
            <input
              type="time"
              id="end_time"
              name="end_time"
              className={styles.formField}
              value={formData.end_time}
              onChange={handleChange}
              required
            />
          </label>
          <br />

          <label htmlFor="city_id" className={styles.formLabel}>
            City ID:
            <select
              name="city_id"
              className={styles.formField}
              value={formData.city_id}
              onChange={handleChange}
              required
            >
              <option value="">Select a City</option>
              {cities.map((city) => (
                <option key={city.city_id} value={city.city_id}>
                  {`${city.country_abbrev} - ${city.state_abbrev} - ${city.city_name}`}
                </option>
              ))}
            </select>
          </label>
          <br />

          <label htmlFor="comments" className={styles.formLabel}>
            Comments:
            <textarea
              id="comments"
              name="comments"
              className={styles.formField}
              value={formData.comments}
              onChange={handleChange}
              rows="3"
              required
            />
          </label>

          <br />

          <button type="submit" className={styles.newReservationBtn}>
            Create Reservation
          </button>
        </form>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      {error && <p>{error}</p>}
    </div>
  );
};

export default NewReservationForm;
