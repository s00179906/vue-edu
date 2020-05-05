<template>
  <Questions :questions="questions" v-if="questions !== null" />
</template>

<script>
import axios from 'axios';
import Questions from '@/components/Questions.vue';

export default {
  components: {
    Questions,
  },
  created() {
    axios
      .get(
        `https://localhost:44382/api/questions/topic/${this.$route.params.id}`,
      )
      .then(response => (this.questions = response.data))
      .catch(error => console.log(error));
  },
  data: () => ({
    questions: null,
  }),
  methods: {},
};
</script>

<style></style>
