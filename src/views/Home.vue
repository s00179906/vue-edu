<template>
  <v-card class="mx-auto" dark>
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
  </v-card>
</template>

<script>
import axios from 'axios';

export default {
  components: {},
  data() {
    return {
      questions: [],
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
  },
};
</script>
