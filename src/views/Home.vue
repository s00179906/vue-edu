<template>
  <v-container>
    <header class="py-10">
      <p class="display-3 font-weight-black text-center py-5">
        WELCOME TO MyEdu!
      </p>
      <p class="title text-center">
        Choose any topic below to get started.
      </p>
    </header>

    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
        sm="12"
        xs="12"
        v-for="(course, index) in courses"
        :key="index"
      >
        <Courses :course="course" />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="8" sm="12" xs="12">
        <Trivia />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import Courses from '../components/Courses.vue';
import Trivia from '../components/Trivia.vue';
import { mapState } from 'vuex';

export default {
  components: {
    Courses,
    Trivia,
  },
  data: () => ({
    courses: [],
  }),
  computed: {
    ...mapState({
      user: state => state.edu.user,
    }),
  },
  created() {
    axios
      .get('https://localhost:44382/api/courses')
      .then(response => {
        this.courses = response.data;
      })
      .catch(error => console.log(error));
  },
};
</script>
