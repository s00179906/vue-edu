<template>
  <v-app-bar dark color="primary">
    <v-toolbar-title>
      <v-btn @click="goToHome" text>
        MyEdu.
      </v-btn>
    </v-toolbar-title>

    <v-spacer></v-spacer>
    <Levelbar v-if="user" :userXP="user.XP" :userLevel="user.Level" />
    <v-spacer></v-spacer>

    <v-btn text v-if="user">{{ user.FullName }}</v-btn>

    <v-menu left bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list color="red">
        <Logout />
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import Levelbar from './Levelbar.vue';
import Logout from './Logout.vue';
import { mapState } from 'vuex';

export default {
  components: {
    Levelbar,
    Logout,
  },
  methods: {
    goToHome() {
      this.$router.push('/');
    },
  },
  computed: {
    ...mapState({
      user: state => state.edu.user,
    }),
  },
};
</script>

<style></style>
