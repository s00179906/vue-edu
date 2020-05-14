<template>
  <v-row justify="center">
    <v-col md="1" class="text-right">{{ user.Level }}</v-col>

    <v-col md="9">
      <v-progress-linear
        class="progress-bar"
        :value="userXP"
        color="purple"
        height="30px"
      ></v-progress-linear>
    </v-col>

    <v-col md="1" class="text-left">{{ nextLevel() }}</v-col>
  </v-row>
</template>

<script>
import { mapState, Store } from 'vuex';
import axios from 'axios';

export default {
  computed: {
    ...mapState({
      user: state => state.edu.user,
      userXP: state => state.edu.userXP,
    }),
  },
  methods: {
    nextLevel() {
      return this.user.Level + 1;
    },
  },
};
</script>

<style lang="scss" scoped>
.progress-bar {
  pointer-events: none;
}
</style>
