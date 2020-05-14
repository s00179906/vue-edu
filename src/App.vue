<template>
  <v-app id="App" dark>
    <v-content>
      <Navbar v-if="showNavbar" />
      <router-view :key="$route.fullPath"></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue';
import { mapState } from 'vuex';

export default {
  name: 'App',
  components: { Navbar },
  computed: {
    ...mapState({
      showNavbar: state => state.edu.showNavbar,
      user: state => state.edu.user,
      userXP: state => state.edu.userXP,
    }),
  },
  created() {
    const isLoggedIn = !!localStorage.getItem('auth');

    if (isLoggedIn) {
      if (this.user === null) {
        this.$store.dispatch('fetchUser');
      }

      this.$store.commit('toggleNavbar', true);
    }
  },
};
</script>

<style lang="scss">
#App {
  background: #16191d;
  font-family: 'Poppins' !important;
}
.swal2-container {
  font-family: 'Poppins' !important;
}
.swal2-popup {
  background: #16191d !important;
}
.swal2-title {
  color: #2196f3;
}
.swal2-input,
.swal2-input[type='number'] {
  border-color: #2196f3;
  width: 100%;
  max-width: 100%;
}
</style>
