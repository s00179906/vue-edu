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

export default {
  name: 'App',
  components: { Navbar },
  created() {
    if (
      this.$router.currentRoute.path !== '/register' &&
      this.$router.currentRoute.path !== '/login'
    ) {
      this.showNavbar = true;
    }
  },
  data: () => ({
    showNavbar: false,
  }),
};
</script>

<style lang="scss">
#App {
  background: #16191d;
  font-size: 'Poppins' !important;
}
</style>
