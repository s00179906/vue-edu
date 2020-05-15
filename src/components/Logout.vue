<template>
  <v-list-item @click="logout" dark>
    <v-list-item-title>Logout</v-list-item-title>
  </v-list-item>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.clear();
      this.$store.commit('toggleNavbar', false);
      this.$router.push({ name: 'Login' });
    },
  },
};
</script>

<style></style>
