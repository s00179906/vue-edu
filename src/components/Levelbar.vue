<template>
  <v-row>
    <v-col md="1" class="text-right">1</v-col>

    <v-col md="9">
      <v-progress-linear
        v-model="valueDeterminate"
        color="orange"
        height="30px"
      ></v-progress-linear>
    </v-col>

    <v-col md="1" class="text-left">2</v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    valueDeterminate: 50,
  }),
};
</script>

<style></style>
