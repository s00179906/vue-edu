<template>
  <v-list dark color="primary" class="mx-auto" max-width="800" v-if="this.user">
    <v-list-item-group>
      <v-list-item
        v-for="(a, index) in achievements"
        :key="index"
        :disabled="hasUserUnlocked(a)"
      >
        <v-list-item-content>
          <v-list-item-title v-text="a.Title"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-avatar>
          <v-img :src="a.Image"></v-img>
        </v-list-item-avatar>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import Swal from 'sweetalert2';

export default {
  data: () => ({
    achievements: [],
  }),
  computed: {
    ...mapState({
      user: state => state.edu.user,
    }),
  },
  created() {
    axios
      .get('https://edu20200515000357.azurewebsites.net/api/achievements')
      .then(response => {
        this.achievements = response.data;
        console.log(this.achievements);
      })
      .catch(error => console.log(error));
  },
  methods: {
    hasUserUnlocked(a) {
      if (this.user.Level >= a.UnlockedAtLevel) {
        Swal.fire({
          title: `Hurray you've unlocked ${a.Title}`,
          width: 600,
          backdrop: `
          rgba(0,0,0,0.8)
          url("https://media.giphy.com/media/dMp9eZaAlYvvi/giphy.gif")
          center top
          no-repeat
        `,
        });
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>

<style></style>
