<template>
  <div>
    <v-app-bar app dark color="primary">
      <v-toolbar-title>
        <v-btn @click="changeRoute('/home')" text>
          MyEdu.
        </v-btn>
      </v-toolbar-title>

      <Levelbar v-if="user" />

      <v-btn outlined color="info" class="mx-2" @click="createNewQuestion">
        New Question
      </v-btn>

      <v-btn
        outlined
        color="purple"
        class="mx-2"
        @click="changeRoute('/achievements')"
      >
        Achievements
      </v-btn>

      <v-menu left bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list color="red">
          <Logout />
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-progress-linear
      v-if="showLoading"
      indeterminate
      color="purple darken-2"
    ></v-progress-linear>
  </div>
</template>

<script>
import Levelbar from './Levelbar.vue';
import Logout from './Logout.vue';
import { mapState } from 'vuex';
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  components: {
    Levelbar,
    Logout,
  },
  methods: {
    changeRoute(route) {
      if (this.$router.currentRoute.path != route) {
        this.$router.push(route);
      }
    },
    async createNewQuestion() {
      const { value: formValues } = await Swal.fire({
        title: 'Create your Question!',
        html:
          '<select id="courses" class="swal2-input"> <option value="" disabled selected>Select your option</option><option value="1">Math</option></select>' +
          '<input id="swal-input1" class="swal2-input" placeholder="Pick a number" type="number">' +
          '<select id="operators" class="swal2-input"><option value="+">+</option><option value="-">-</option><option value="*">x</option><option value="/">÷</option</select>' +
          '<input id="swal-input2" class="swal2-input" placeholder="Pick a number" type="number">',
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById('swal-input1').value,
            document.getElementById('swal-input2').value,
            document.getElementById('operators').value,
            document.getElementById('courses').value,
          ];
        },
      });

      if (formValues) {
        const [num1, num2, operator, course] = formValues;

        let topicID = null;
        console.log(operator);

        switch (operator) {
          case '+':
            topicID = 2;
            break;
          case '-':
            topicID = 3;
            break;
          case '*':
            topicID = 4;
            break;
          case '/':
            topicID = 5;
            break;
        }

        const data = {
          title: `${num1} ${operator} ${num2}`,
          topicID,
          category: 'Math',
          courseID: course,
        };

        console.log(data);

        axios
          .post(
            'https://edu20200515000357.azurewebsites.net/api/questions/create',
            data,
          )
          .then(
            response => {
              console.log(response);
              Swal.fire(
                'Good job!',
                'Your question has been Created!',
                'success',
              );
            },
            error => {
              console.log(error);
            },
          );
      }
    },
  },
  computed: {
    ...mapState({
      user: state => state.edu.user,
      showLoading: state => state.edu.showLoading,
    }),
  },
};
</script>

<style></style>
