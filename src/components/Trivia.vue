<template>
  <v-card class="card mx-auto" dark color="primary">
    <div style="background-color: #2196F3;">
      <p class="font-weight-bold display-1 text-center py-2">
        Trivia
      </p>
    </div>

    <v-list color="transparent">
      <v-list-item
        v-for="category of categories"
        :key="category.id"
        @click="goToTriviaPage(category.id)"
      >
        <v-list-item-content>
          <p class="text-center mb-0 py-2">{{ category.name }}</p>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import axios from 'axios';
export default {
  data: () => ({
    categories: [
      {
        id: 9,
        name: 'General Knowledge',
      },
      {
        id: 10,
        name: 'Entertainment: Books',
      },
      {
        id: 11,
        name: 'Entertainment: Film',
      },
      {
        id: 12,
        name: 'Entertainment: Music',
      },
      {
        id: 13,
        name: 'Entertainment: Musicals & Theatres',
      },
      {
        id: 14,
        name: 'Entertainment: Television',
      },
      {
        id: 15,
        name: 'Entertainment: Video Games',
      },
      {
        id: 16,
        name: 'Entertainment: Board Games',
      },
      {
        id: 17,
        name: 'Science & Nature',
      },
    ],
  }),

  methods: {
    goToTriviaPage(id) {
      this.$router.push(`/trivia/${id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  background: linear-gradient(145deg, #14171a, #181b1f);
  box-shadow: 18px 18px 24px #121417, -18px -18px 24px #1a1e23;
}
</style>
