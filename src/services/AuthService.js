import axios from 'axios';

const API_URL = 'https://smart-coworking-857b32bb5cda.herokuapp.com/';

const authService = {
  register: async (name, email, password, passwordConfirmation, role) => {
    const response = await axios.post(`${API_URL}signup`, {
      user: {
        name,
        email,
        password,
        passwordConfirmation,
        role,
      },
    }, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response;
  },

  login: async (email, password) => {
    const response = await axios.post(`${API_URL}login`, {
      user: {
        email,
        password,
      },
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  },

  logout: async () => Promise.resolve(),
};

export default authService;
