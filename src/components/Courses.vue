<template>
  <v-card class="card mx-auto" max-width="500px" dark>
    <div style="background-color: orange;">
      <p class="font-weight-bold display-1 text-center py-3">
        {{ course.category }}
      </p>
    </div>

    <v-btn text block>{{ course.title }}</v-btn>

    <v-card-actions>
      <v-btn color="info" text>
        Learn >
      </v-btn>

      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    course: Object,
  },
  created() {
    console.log(this.course);
  },
};
</script>

<style lang="scss" scoped>
.card {
  background: linear-gradient(145deg, #14171a, #181b1f);
  box-shadow: 18px 18px 24px #121417, -18px -18px 24px #1a1e23;
}
</style>
