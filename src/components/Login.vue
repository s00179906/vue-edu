<template>
  <v-btn large dark @click="login" color="purple" outlined>Login</v-btn>
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
