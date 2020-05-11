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
    }),
  },
};
</script>

<style lang="scss">
#App {
  background: #16191d;
  font-size: 'Poppins' !important;
}
</style>
