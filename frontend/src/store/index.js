import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    user: null,
    token: localStorage.getItem('token') || '',
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    async login({ commit }, user) {
      const response = await axios.post('http://localhost:5000/api/users/login', user);
      const token = response.data.token;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = token;
      commit('setToken', token);
      const userResponse = await axios.get('http://localhost:5000/api/users/profile');
      commit('setUser', userResponse.data.user);
    },
    async register({ commit }, user) {
      await axios.post('http://localhost:5000/api/users/register', user);
    },
    logout({ commit }) {
      commit('setUser', null);
      commit('setToken', '');
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    },
  },
  modules: {},
});
