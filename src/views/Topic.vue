<template>
  <Questions
    :questions="questions"
    v-if="questions !== null"
    :topicID="topicID"
  />
</template>

<script>
import axios from 'axios';
import Questions from '@/components/Questions.vue';

export default {
  components: {
    Questions,
  },
  created() {
    this.topicID = this.$route.params.id;
    axios
      .get(`https://localhost:44382/api/questions/topic/${this.topicID}`)
      .then(response => (this.questions = response.data))
      .catch(error => console.log(error));
  },
  data: () => ({
    questions: null,
    topicID: null,
  }),
  methods: {},
};
</script>

<style></style>
