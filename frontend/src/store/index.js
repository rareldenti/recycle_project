import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    token: localStorage.getItem('token') || '',
    user: JSON.parse(localStorage.getItem('user')) || {},
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    LOGOUT(state) {
      state.token = '';
      state.user = {};
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },
  actions: {
    async login({ commit }, credentials) {
      const response = await axios.post('/users/login', credentials);
      const token = response.data.token;
      const user = response.data.user;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      commit('SET_TOKEN', token);
      commit('SET_USER', user);
    },
    async fetchUser({ commit, state }) {
      const response = await axios.get('/users/profile', {
        headers: { 'Authorization': `Bearer ${state.token}` }
      });
      commit('SET_USER', response.data.user);
    },
    logout({ commit }) {
      commit('LOGOUT');
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    user: state => state.user,
  }
});
