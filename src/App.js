import React from 'react';
import PropTypes from 'prop-types';

import {
  BrowserRouter as Router, Route, Routes, Navigate,
} from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/LoginComponent';
import Register from './components/RegisterComponent';
import NewReservationForm from './components/NewReservationForm';
import Splash from './pages/splash';
import NewSpaceCwForm from './components/NewSpaceCwForm';
import DeleteSpaceCwForm from './components/DeleteSpaceCwForm';
import Sidebar from './components/SidebarComponent';
import DetailsPage from './pages/DetailsPage';
import UserReservations from './components/UserReservations';

const PrivateRoute = ({ children }) => {
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  return user ? children : <Navigate to="/" />;
};
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
function App() {
  const userId = JSON.parse(localStorage.getItem('user'))?.user.id;
  return (
    <Router basename="/smart-coworking-frontend">
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar />
        <div style={{ flexGrow: 1 }}>
          <div className="main-content-area">
            <Routes>
              {/* Routes without sidebar */}
              <Route path="/" element={<Splash />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected routes */}
              <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
              <Route path="/detailsPage/:spaceId" element={<PrivateRoute><DetailsPage /></PrivateRoute>} />
              <Route path="/newSpaceCw" element={<PrivateRoute><NewSpaceCwForm /></PrivateRoute>} />
              <Route path="/deleteSpaceCw" element={<PrivateRoute><DeleteSpaceCwForm /></PrivateRoute>} />
              <Route path="/NewReservation" element={<PrivateRoute><NewReservationForm /></PrivateRoute>} />
              <Route path="/MyReservations" element={<PrivateRoute><UserReservations userId={userId} /></PrivateRoute>} />
              {/* Catch-all route for 404 Not Found */}
              <Route path="*" element={<div>404 Not Found</div>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
