<template>
  <v-row justify="center">
    <v-col md="1" class="text-right">{{ userLevel }}</v-col>

    <v-col md="9">
      <v-progress-linear
        class="progress-bar"
        :value="levelXP"
        color="orange"
        height="30px"
      ></v-progress-linear>
    </v-col>

    <v-col md="1" class="text-left">{{ test() }}</v-col>
  </v-row>
</template>

<script>
import { mapState, Store } from 'vuex';
import axios from 'axios';

export default {
  props: {
    userLevel: Number,
    userXP: Number,
  },
  computed: {
    ...mapState({
      user: state => state.edu.user,
    }),
  },
  async created() {
    const response = await axios.get(
      `https://localhost:44382/api/account/level/${this.userLevel}`,
      {
        params: {},
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('auth')).access_token
          }`,
        },
      },
    );
    const value = (this.userXP / response.data) * 100;

    this.levelXP = value;
  },
  data: () => ({
    levelXP: 0,
  }),
  methods: {
    test() {
      return this.userLevel + 1;
    },
  },
};
</script>

<style lang="scss" scoped>
.progress-bar {
  pointer-events: none;
}
</style>
