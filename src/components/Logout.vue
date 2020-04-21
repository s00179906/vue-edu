<template>
  <v-list-item @click="logout" color="danger">
    <v-list-item-title>Logout</v-list-item-title>
  </v-list-item>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({ path: '/login' });
    },
  },
};
</script>

<style></style>
