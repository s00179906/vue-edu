import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: { customProperties: true },
    dark: true,
    themes: {
      dark: {
        primary: '#16191D',
        secondary: '#0c0c0c',
        accent: '#767f94',
        danger: 'red',
      },
    },
  },
});
