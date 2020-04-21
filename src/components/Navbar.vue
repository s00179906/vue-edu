<template>
  <v-app-bar dark color="primary">
    <v-toolbar-title>MyEdu.</v-toolbar-title>

    <v-spacer></v-spacer>

    <Search />

    <v-spacer></v-spacer>

    <v-btn text>ighaffar9900</v-btn>

    <v-menu left bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item @click="() => {}" color="danger">
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import Search from './Search.vue';

export default {
  components: {
    Search,
  },
};
</script>

<style></style>
