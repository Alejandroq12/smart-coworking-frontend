import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../assets/stylesheets/NewSpaceCwForm.module.css';
import API_BASE_URL from '../constants';

const NewSpaceCwForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    model: '',
    description: '',
    address: '',
    price: '',
    image: '',
    discount: '',
    category: '',
    user_id: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    // Get user ID from local storage
    const userId = JSON.parse(localStorage.getItem('user'))?.user.id;
    if (userId) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        user_id: userId,
      }));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jwt = JSON.parse(localStorage.getItem('user'))?.jwt;
    try {
      await axios.post(`${API_BASE_URL}api/v1/users/:user_id/space_cws`, formData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      setSuccessMessage('New coworking space created successfully!');
      setFormData({
        name: '',
        model: '',
        description: '',
        address: '',
        price: '',
        image: '',
        discount: '',
        category: '',
        user_id: formData.user_id,
      });
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000); // 5 seconds
    } catch (error) {
      setErrorMessage('Error creating coworking space. Please try again later.');
      setTimeout(() => {
        setErrorMessage('');
      }, 8000); // 8 seconds
    }
  };

  return (
    <div className={styles.newCwsContainer}>
      <div className={styles.newCwsOverlay}>
        <h2 className={styles.newCwsTitle}>Create a new coworking space</h2>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <input
            type="text"
            name="name"
            className={styles.formField}
            placeholder="Name:"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="model"
            className={styles.formField}
            placeholder="Model:"
            value={formData.model}
            onChange={handleChange}
          />

          <textarea
            name="description"
            className={styles.formField}
            rows="5"
            placeholder="Description:"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="address"
            className={styles.formField}
            placeholder="Address:"
            value={formData.address}
            onChange={handleChange}
          />

          <input
            type="number"
            name="price"
            className={styles.formField}
            placeholder="Price: $10.0"
            value={formData.price}
            onChange={handleChange}
          />

          <input
            type="text"
            name="image"
            className={styles.formField}
            placeholder="Image URL:"
            value={formData.image}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="discount"
            className={styles.formField}
            placeholder="Discount: $10.0"
            value={formData.discount}
            onChange={handleChange}
          />

          <input
            type="text"
            name="category"
            className={styles.formField}
            placeholder="Category:"
            value={formData.category}
            onChange={handleChange}
            required
          />

          <label htmlFor="user_id">
            Your actual user ID (Auto-filled):
            <input
              type="number"
              name="user_id"
              className={styles.formField}
              value={formData.user_id}
              onChange={handleChange}
              required
              readOnly
            />
          </label>

          {/* Success and error messages */}
          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className={styles.newSpaceBtn}>Create Coworking Space</button>
        </form>
      </div>
    </div>
  );
};

export default NewSpaceCwForm;
