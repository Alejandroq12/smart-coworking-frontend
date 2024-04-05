import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCoworkingSpaces } from '../actions/homeActions';
import '../assets/css/home-page.css';

const Home = () => {
  const dispatch = useDispatch();
  const { coworkingSpaces, loading, error } = useSelector(
    (state) => state.coworkingSpaces,
  );

  // Retrieve the user ID from local storage
  const userId = JSON.parse(localStorage.getItem('user'))?.user.id;

  useEffect(() => {
    // Ensure userId is not null or undefined before dispatching
    if (userId) {
      dispatch(fetchCoworkingSpaces());
    }
  }, [dispatch, userId]);

  const [visibleStartIndex, setVisibleStartIndex] = useState(0);

  const scrollLeft = () => {
    setVisibleStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const scrollRight = () => {
    setVisibleStartIndex((prevIndex) => Math.min(prevIndex + 1, coworkingSpaces.length - 3));
  };

  const handleKeyPress = (event, action) => {
    if (event.keyCode === 13 || event.keyCode === 32) {
      action();
    }
  };

  const visibleSpaces = coworkingSpaces.slice(
    visibleStartIndex,
    visibleStartIndex + 3,
  );

  return (
    <div className="home-page-container">
      <div className="content-center">
        {loading && <p>Loading...</p>}
        {error && (
        <p>
          Error:
          {error}
        </p>
        )}
        <h1>Latest coworking spaces</h1>
        <p className="select-space-paragraph">Please select a coworking space</p>
        <div className="decorative-dots">
          <div className="decorative-dot" />
          <div className="decorative-dot" />
          <div className="decorative-dot" />
          <div className="decorative-dot" />
          <div className="decorative-dot" />
          <div className="decorative-dot" />
          <div className="decorative-dot" />
          <div className="decorative-dot" />
          <div className="decorative-dot" />
          <div className="decorative-dot" />
          <div className="decorative-dot" />
          <div className="decorative-dot" />
          <div className="decorative-dot" />
          <div className="decorative-dot" />
          <div className="decorative-dot" />
          <div className="decorative-dot" />
        </div>
        <div className="slider-container">
          <div
            className={`arrow left-arrow ${visibleStartIndex === 0 ? 'disabled' : ''}`}
            onClick={scrollLeft}
            onKeyDown={(event) => handleKeyPress(event, scrollLeft)}
            role="button"
            tabIndex={0}
            aria-disabled={visibleStartIndex === 0}
          >
            <img
              src={visibleStartIndex === 0 ? '../../assets/arrows/leftDisabled.svg' : '../../assets/arrows/left.svg'}
              alt="Left"
            />
          </div>
          <div className="spaces-slider">
            {visibleSpaces && visibleSpaces.map((space) => (
              <Link to={`/detailsPage/${space.id}`} key={space.id}>
                <div className="space-item">
                  <img className="space-image" alt={space.name} src={space.image} />
                  <div className="space-info">
                    <strong>{space.name}</strong>
                    <div className="decorative-dots">
                      <div className="decorative-dot" />
                      <div className="decorative-dot" />
                      <div className="decorative-dot" />
                      <div className="decorative-dot" />
                      <div className="decorative-dot" />
                      <div className="decorative-dot" />
                      <div className="decorative-dot" />
                      <div className="decorative-dot" />
                      <div className="decorative-dot" />
                      <div className="decorative-dot" />
                      <div className="decorative-dot" />
                      <div className="decorative-dot" />
                    </div>
                    <p>{space.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div
            className={`arrow right-arrow ${visibleStartIndex >= coworkingSpaces.length - 3 ? 'disabled' : ''}`}
            onClick={scrollRight}
            onKeyDown={(event) => handleKeyPress(event, scrollRight)}
            role="button"
            tabIndex={0}
            aria-disabled={visibleStartIndex >= coworkingSpaces.length - 3}
          >
            <img
              src={visibleStartIndex >= coworkingSpaces.length - 3 ? '../../assets/arrows/rightDisabled.svg' : '../../assets/arrows/right.svg'}
              alt="Right"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
