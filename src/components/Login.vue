<template>
  <v-btn class="login-btn" large dark @click="login">Login</v-btn>
</template>

<script>
export default {
  methods: {
    login() {
      this.$router.push({ path: 'login' });
    },
  },
};
</script>

<style></style>
