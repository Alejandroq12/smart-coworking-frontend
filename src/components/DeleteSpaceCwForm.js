import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import styles from '../assets/stylesheets/DeleteSpaceCwForm.module.css';
import { CLEAR_PERSISTED_STATE } from '../actions/clearState';
import API_BASE_URL from '../constants';

const DeleteSpaceCwForm = () => {
  const dispatch = useDispatch();
  const userId = JSON.parse(localStorage.getItem('user'))?.user.id;

  // Initialized with null to ensure no space is unintentionally selected
  const [selectedSpaceCwId, setSelectedSpaceCwId] = useState(null);
  const [spaceCws, setSpaceCws] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [fetchError, setFetchError] = useState('');

  const fetchSpaceCws = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}api/v1/coworking_spaces`);
      setSpaceCws(response.data);
    } catch (error) {
      setFetchError('Error fetching coworking spaces');
    }
  };

  useEffect(() => {
    if (userId) {
      fetchSpaceCws();
    }
  }, [userId]);

  const handleChange = (e) => {
    setSelectedSpaceCwId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSpaceCwId) {
      setErrorMessage('Please select a coworking space.');
      setTimeout(() => {
        setErrorMessage('');
      }, 5000); // Display the error for 5 seconds
      return;
    }

    try {
      const deleteUrl = `${API_BASE_URL}api/v1/users/${userId}/space_cws/${selectedSpaceCwId}`;
      await axios.delete(deleteUrl);
      setSuccessMessage('Coworking space was deleted successfully!');
      dispatch({ type: CLEAR_PERSISTED_STATE });
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000); // Hide the message after 5 seconds
      setSelectedSpaceCwId(null);
      fetchSpaceCws();
    } catch (error) {
      setErrorMessage('Error deleting the coworking space. Please try again later.');
      setTimeout(() => {
        setErrorMessage('');
      }, 8000); // Hide the message after 8 seconds
    }
  };

  return (
    <div className={styles.deleteCwsContainer}>
      <div className={styles.deleteCwsOverlay}>
        <h2 className={styles.deleteCwsTitle}>Delete a Coworking Space</h2>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <label htmlFor="space_cw_id" className={styles.formLabel}>
            Choose a Workspace:
            <select
              id="space_cw_id"
              name="space_cw_id"
              className={styles.formField}
              value={selectedSpaceCwId || ''}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select a Workspace</option>
              {spaceCws.map((spaceCw) => (
                <option key={spaceCw.id} value={spaceCw.id}>
                  {spaceCw.name}
                </option>
              ))}
            </select>
          </label>

          <input
            type="hidden"
            name="user_id"
            value={userId}
            required
          />

          {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
          {fetchError && <p className={styles.errorMessage}>{fetchError}</p>}

          <button type="submit" className={styles.deleteSpaceBtn}>
            Delete Coworking Space
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeleteSpaceCwForm;
