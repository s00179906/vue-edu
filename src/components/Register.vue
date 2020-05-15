<template>
  <v-btn large dark @click="register" outlined color="purple">Register</v-btn>
</template>

<script>
export default {
  methods: {
    register() {
      this.$router.push({ name: 'Register' });
    },
  },
};
</script>

<style></style>
