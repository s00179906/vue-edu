<template>
  <v-card class="card mx-auto" dark color="primary">
    <div style="background-color: purple;">
      <p class="font-weight-bold display-1 text-center py-2">
        {{ course.category }}
      </p>
    </div>

    <Topics />
  </v-card>
</template>

<script>
import Topics from '@/components/Topics.vue';

export default {
  props: {
    course: Object,
  },
  components: {
    Topics,
  },
};
</script>

<style lang="scss" scoped>
.card {
  background: linear-gradient(145deg, #14171a, #181b1f);
  box-shadow: 18px 18px 24px #121417, -18px -18px 24px #1a1e23;
}
</style>
