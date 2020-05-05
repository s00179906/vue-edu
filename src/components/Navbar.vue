<template>
  <v-app-bar dark color="primary">
    <v-toolbar-title>
      <v-btn @click="goToHome" text>
        MyEdu.
      </v-btn>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <Levelbar />

    <v-spacer></v-spacer>

    <v-btn text>ighaffar9900</v-btn>

    <v-menu left bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <Logout />
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import Levelbar from './Levelbar.vue';
import Logout from './Logout.vue';

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
};
</script>

<style></style>
