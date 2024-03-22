import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../assets/stylesheets/NewSpaceCwForm.module.css';

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
    try {
      await axios.post('https://smart-coworking-857b32bb5cda.herokuapp.com/api/v1/users/:user_id/space_cws', formData);
      setSuccessMessage('New coworking space created successfully!');
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
        <h2 className={styles.newCwsTitle}>Create a New Coworking Space</h2>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          {/* <label htmlFor="name">Name:</label> */}
          <input
            type="text"
            name="name"
            className={styles.formField}
            placeholder="Name:"
            value={formData.name}
            onChange={handleChange}
            required
          />

          {/* <label htmlFor="model">Model:</label> */}
          <input
            type="text"
            name="model"
            className={styles.formField}
            placeholder="Model:"
            value={formData.model}
            onChange={handleChange}
          />

          {/* <label htmlFor="description">Description:</label> */}
          <textarea
            name="description"
            className={styles.formField}
            rows="5"
            placeholder="Description:"
            value={formData.description}
            onChange={handleChange}
            required
          />

          {/* <label htmlFor="address">Address:</label> */}
          <input
            type="text"
            name="address"
            className={styles.formField}
            placeholder="Address:"
            value={formData.address}
            onChange={handleChange}
          />

          {/* <label htmlFor="price">Price:</label> */}
          <input
            type="number"
            name="price"
            className={styles.formField}
            placeholder="Price: $10.0"
            value={formData.price}
            onChange={handleChange}
          />

          {/* <label htmlFor="image">Image URL:</label> */}
          <input
            type="text"
            name="image"
            className={styles.formField}
            placeholder="Image URL:"
            value={formData.image}
            onChange={handleChange}
            required
          />

          {/* <label htmlFor="discount">Discount:</label> */}
          <input
            type="number"
            name="discount"
            className={styles.formField}
            placeholder="Discount: $10.0"
            value={formData.discount}
            onChange={handleChange}
          />

          {/* <label htmlFor="category">Category:</label> */}
          <input
            type="text"
            name="category"
            className={styles.formField}
            placeholder="Category:"
            value={formData.category}
            onChange={handleChange}
            required
          />

          {/* You can hide user_id; set it dynamically using logged-in user; */}
          {/* type="hidden"; value={loggedInUserId} */}
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
