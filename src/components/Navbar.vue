<template>
  <v-app-bar dark color="primary">
    <v-toolbar-title>
      <v-btn @click="goToHome" text>
        MyEdu.
      </v-btn>
    </v-toolbar-title>

    <v-spacer></v-spacer>
    <Levelbar v-if="user" />
    <v-spacer></v-spacer>

    <v-btn outlined color="info" class="mx-2" @click="createNewQuestion">
      New Question
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
    goToHome() {
      this.$router.push('/');
    },
    async createNewQuestion() {
      const { value: formValues } = await Swal.fire({
        title: 'Create your Question!',
        html:
          '<select id="courses" class="swal2-input"><option value="1">Math</option></select>' +
          '<input id="swal-input1" class="swal2-input" placeholder="Number" type="number">' +
          '<select id="operators" class="swal2-input"><option value="+">+</option><option value="-">-</option><option value="*">x</option><option value="/">÷</option</select>' +
          '<input id="swal-input2" class="swal2-input" placeholder="Number" type="number">',
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

        axios.post('https://localhost:44382/api/questions/create', data).then(
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
    }),
  },
};
</script>

<style></style>
