import axios from 'axios';
import React, { useState, useEffect } from 'react';
import '../assets/css/newreservation.css';
import styles from '../assets/stylesheets/NewReservationForm.module.css';

const NewReservationForm = () => {
  const [formData, setFormData] = useState({
    user_id: '',
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

  // const [cities, setCities] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('user'))?.user.id;
    setFormData((prevFormData) => ({ ...prevFormData, user_id: userId }));
  }, []);

  useEffect(() => {
    const fetchSpaceCws = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/users/${formData.user_id}/space_cws`);
        setSpaceCws(response.data);
        const cityIds = response.data.map((spaceCw) => spaceCw.city_id);
        setFormData((prevFormData) => ({
          ...prevFormData,
          city_id: cityIds[0] || '',
        }));
      } catch (error) {
        console.error('Error fetching Space_cws:', error);
      }
    };
    fetchSpaceCws();
  }, [formData.user_id]);

  // useEffect(() => {
  //   const fetchCities = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:3001/api/v1/cities');
  //       setCities(response.data);
  //     } catch (error) {
  //       console.error('Error fetching cities:', error);
  //     }
  //   };
  //   fetchCities();
  // }, []);

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
      await axios.post('http://localhost:3001/api/v1/users/:user_id/reservations', formData);
      setSuccessMessage('Reservation created successfully!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000); // 5 seconds
      setErrorMessage('');
    } catch (error) {
      console.error('Error creating reservation:', error);
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
          <input
            type="number"
            name="user_id"
            className={styles.formField}
            value={formData.user_id}
            onChange={handleChange}
            placeholder="User Id:"
            readOnly
          />
          <br />

          <select
            name="space_cw_id"
            className={styles.formField}
            value={formData.space_cw_id}
            onChange={handleChange}
            required
          >
            <option value="">Select a Space_cw</option>
            {spaceCws.map((spaceCw) => (
              <option key={spaceCw.id} value={spaceCw.id}>
                {spaceCw.name}
              </option>
            ))}
          </select>
          <br />

          <input
            type="date"
            name="date_reserved"
            className={styles.formField}
            value={formData.date_reserved}
            onChange={handleChange}
            placeholder="Date Reserved:"
            required
          />
          <br />

          <input
            type="date"
            name="date_cancelled"
            className={styles.formField}
            value={formData.date_cancelled}
            onChange={handleChange}
            placeholder="Date Cancelled:"
          />
          <br />

          <input
            type="date"
            name="start_date"
            className={styles.formField}
            value={formData.start_date}
            onChange={handleChange}
            placeholder="Start Date:"
            required
          />
          <br />

          <input
            type="date"
            name="end_date"
            className={styles.formField}
            value={formData.end_date}
            onChange={handleChange}
            placeholder="Start Date:"
            required
          />
          <br />

          <input
            type="time"
            name="start_time"
            className={styles.formField}
            value={formData.start_time}
            onChange={handleChange}
            placeholder="Start TIme:"
            required
          />
          <br />

          <input
            type="time"
            name="end_time"
            className={styles.formField}
            value={formData.end_time}
            onChange={handleChange}
            placeholder="End TIme:"
            required
          />
          <br />

          <input
            name="city_id"
            type="number"
            value={formData.city_id}
            className={styles.formField}
            onChange={handleChange}
            required
          />
          <br />

          {/* <option value="">Select a City</option>
            {cities.map((city) => (
              <option
                key={city.id}
                value={city.id}
              >
                {city.name}
              </option>
            ))} */}

          <input
            type="textarea"
            name="comments"
            className={styles.formField}
            value={formData.comments}
            onChange={handleChange}
            placeholder="Comments:"
            rows="3"
            required
          />
          <br />

          <button
            type="submit"
            className={styles.newReservationBtn}
          >
            Create Reservation
          </button>
        </form>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default NewReservationForm;
