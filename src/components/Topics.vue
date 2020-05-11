<template>
  <v-list color="transparent">
    <v-list-item v-for="(topic, index) of topics" :key="index">
      <v-list-item-content>
        <v-btn text block @click="getTopic(topic.topicID)">{{
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
    getTopic(id) {
      this.$router.push({ name: 'Topic', params: { id } });
    },
  },
};
</script>

<style></style>
