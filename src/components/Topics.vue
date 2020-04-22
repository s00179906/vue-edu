<template>
  <v-list>
    <v-list-item v-for="(topic, index) of topics" :key="index">
      <v-list-item-content>
        <v-btn text block @click="getTopic(topic)">{{
          topic.topicTitle
        }}</v-btn>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import axios from 'axios';

export default {
  created() {
    axios
      .get('https://localhost:44382/api/topics')
      .then(response => {
        console.log(response.data);
        this.topics = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  },

  data: () => ({
    topics: null,
  }),
  methods: {
    getTopic(topic) {
      console.log(topic);
    },
  },
};
</script>

<style></style>
