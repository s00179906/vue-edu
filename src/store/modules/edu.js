import axios from 'axios';
import qs from 'qs';

const state = {
  user: null,
  showNavbar: false,
  userXP: 0,
  xpOfUsersLevel: 0,
  showLoading: false,
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
    const url = 'https://localhost:44382/token';
    const hostedUrl = 'https://edu20200515000357.azurewebsites.net/token';

    const options = {
      method: 'post',
      url: hostedUrl,
      data,
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    };

    try {
      const auth = await axios(options);

      localStorage.setItem('auth', JSON.stringify(auth.data));

      const userInfo = await axios
        .get(
          'https://edu20200515000357.azurewebsites.net/api/account/userinfo',
          {
            params: {},
            headers: { Authorization: `Bearer ${auth.data.access_token}` },
          },
        )
        .catch(error => {
          console.log(error);
        });

      localStorage.setItem('userInfo', JSON.stringify(userInfo.data));

      const account = await axios
        .get(
          `https://edu20200515000357.azurewebsites.net/api/account/${userInfo.data.UserId}`,
          {
            params: {},
            headers: { Authorization: `Bearer ${auth.data.access_token}` },
          },
        )
        .catch(error => {
          console.log(error);
        });

      commit('setUserAuth', account.data);
    } catch (error) {
      console.log(error);
    }
  },
  async fetchUser({ commit, dispatch }) {
    try {
      const { UserId } = JSON.parse(localStorage.getItem('userInfo'));
      const { access_token } = JSON.parse(localStorage.getItem('auth'));

      const account = await axios.get(
        `https://edu20200515000357.azurewebsites.net/api/account/${UserId}`,
        {
          params: {},
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      );

      commit('setUserAuth', account.data);
      dispatch('updateUserXP', {
        userXP: state.user.XP,
        userLevel: state.user.Level,
      });
    } catch (error) {
      console.log(error);
    }
  },
  async updateUserXP({ commit }, payload) {
    const response = await axios.get(
      `https://edu20200515000357.azurewebsites.net/api/account/level/${payload.userLevel}`,
      {
        params: {},
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('auth')).access_token
          }`,
        },
      },
    );
    commit('setXPOfUsersLevel', response.data);

    const value = (payload.userXP / response.data) * 100;

    commit('setUserXP', value);
  },
};

const mutations = {
  setUserAuth: (state, user) => (state.user = user),
  toggleNavbar: (state, value) => (state.showNavbar = value),
  setUserXP: (state, value) => (state.userXP = value),
  resetXPBar: (state, value) => (state.userXP = value),
  setXPOfUsersLevel: (state, value) => (state.xpOfUsersLevel = value),
  setShowLoading: (state, value) => (state.showLoading = value),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
