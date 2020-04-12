<template>
  <v-app id="App" dark>
    <v-content>
      <router-view :key="$route.fullPath"></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data: () => ({}),
};
</script>

<style lang="scss">
#App {
  background: #16191d;
  color: #d5dced;
}
</style>
