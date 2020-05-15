<template>
  <v-btn large dark @click="login" color="purple" outlined>Login</v-btn>
</template>

<script>
export default {
  methods: {
    login() {
      this.$router.push({ name: 'Login' });
    },
  },
};
</script>

<style></style>
