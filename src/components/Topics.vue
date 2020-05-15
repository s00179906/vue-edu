<template>
  <v-list color="transparent">
    <v-list-item
      v-for="(topic, index) of topics"
      :key="index"
      @click="getTopic(topic.topicID)"
    >
      <v-list-item-content>
        <p class="text-center mb-0 py-2">{{ topic.topicTitle }}</p>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import axios from 'axios';

export default {
  created() {
    axios
      .get('https://edu20200515000357.azurewebsites.net/api/topics')
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
