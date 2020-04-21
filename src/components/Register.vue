<template>
  <v-btn large dark @click="register">Register</v-btn>
</template>

<script>
export default {
  methods: {
    register() {
      this.$router.push({ path: '/register' });
    },
  },
};
</script>

<style></style>
