<template>
  <v-app id="App" dark>
    <v-content>
      <Navbar />
      <router-view :key="$route.fullPath"></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  name: 'App',
  components: { Navbar },
  data: () => ({}),
};
</script>

<style lang="scss">
#App {
  background: #16191d;
  font-size: 'Poppins' !important;
}
</style>
