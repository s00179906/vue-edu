import axios from 'axios';
import qs from 'qs';

const state = {
  user: null,
  showNavbar: false,
};

const getters = {
  user: state => state.user,
  showNavbar: state => state.showNavbar,
};

const actions = {
  async login({ commit }, payload) {
    const data = qs.stringify({
      username: payload.email,
      password: payload.password,
      grant_type: 'password',
    });

    const options = {
      method: 'post',
      url: 'https://localhost:44382/token',
      data,
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    };

    try {
      const auth = await axios(options);

      localStorage.setItem('auth', JSON.stringify(auth.data));

      const userInfo = await axios
        .get('https://localhost:44382/api/account/userinfo', {
          params: {},
          headers: { Authorization: `Bearer ${auth.data.access_token}` },
        })
        .catch(error => {
          console.log(error);
        });

      const account = await axios
        .get(`https://localhost:44382/api/account/${userInfo.data.UserId}`, {
          params: {},
          headers: { Authorization: `Bearer ${auth.data.access_token}` },
        })
        .catch(error => {
          console.log(error);
        });

      commit('setUserAuth', account.data);
    } catch (error) {
      console.log(error);
    }
  },
  async fetchUser({ commit }) {
    try {
      const userInfo = await axios.get(
        'https://localhost:44382/api/account/userinfo',
        {
          params: {},
          headers: {
            Authorization: `Bearer ${localStorage.get('auth').access_token}`,
          },
        },
      );

      const account = await axios.get(
        `https://localhost:44382/api/account/${userInfo.data.UserId}`,
        {
          params: {},
          headers: {
            Authorization: `Bearer ${localStorage.get('auth').access_token}`,
          },
        },
      );

      commit('setUserAuth', account.data);
    } catch (error) {
      console.log(error);
    }
  },
};

const mutations = {
  setUserAuth: (state, user) => (state.user = user),
  toggleNavbar: (state, value) => (state.showNavbar = value),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
