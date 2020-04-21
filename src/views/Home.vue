<template>
  <v-container>
    <header class="py-10">
      <p class="display-3 font-weight-black text-center py-5">
        WELCOME TO MyEdu!
      </p>
      <p class="title text-center">
        Choose any course below to get started.
      </p>
    </header>

    <v-row justify="center">
      <v-col
        cols="12"
        md="4"
        sm="12"
        xs="12"
        v-for="(course, index) in courses"
        :key="index"
      >
        <Courses :course="course" />
      </v-col>
    </v-row>
  </v-container>
  <!-- <v-card class="mx-auto" dark>
    <v-list dark>
      <v-subheader>Questions</v-subheader>

      <v-list-item-group v-model="questions" color="primary">
        <v-list-item v-for="(question, i) in questions" :key="i">
          <v-list-item-content>
            <v-list-item-title v-text="question.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>-->
</template>

<script>
import axios from 'axios';
import Courses from '../components/Courses.vue';

export default {
  components: {
    Courses,
  },
  data() {
    return {
      questions: [],
      courses: [],
    };
  },
  created() {
    axios
      .get('https://localhost:44382/api/questions')
      .then(response => {
        console.log(response.data);
        this.questions = response.data;
      })
      .catch(error => {
        console.log(error);
      });
    axios
      .get('https://localhost:44382/api/courses')
      .then(response => {
        console.log(response.data);
        this.courses = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
};
</script>
