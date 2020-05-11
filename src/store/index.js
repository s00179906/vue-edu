import Vue from 'vue';
import Vuex from 'vuex';
import edu from './modules/edu';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    edu,
  },
});
