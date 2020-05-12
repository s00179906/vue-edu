<template>
  <v-container>
    <v-row justify="space-between">
      <v-btn text @click="backToCourses" icon>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <v-btn outlined color="success"> <v-icon>mdi-plus</v-icon> 25 XP </v-btn>
    </v-row>

    <v-row justify="center" align="center">
      <v-col md="2" xs="2" sm="2" class="text-right">
        <v-btn @click="previousQuestion" icon>
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-col>

      <v-col md="8" xs="8" sm="8">
        <v-row>
          <v-col>
            <p class="text-center display-3 font-weight-bold">
              {{ choosenQuestion.title }} =
            </p>
          </v-col>

          <v-col>
            <v-text-field
              dark
              v-model="answer"
              color="orange"
              type="number"
              autofocus
            ></v-text-field>
          </v-col>
        </v-row>
      </v-col>

      <v-col md="2" xs="2" sm="2">
        <v-row justify="center" align="center">
          <v-col>
            <v-btn @click="nextQuestion" icon>
              <v-icon>mdi-arrow-right</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-btn @click="answerQuestion" :disabled="!answer" color="info"
        >Submit answer</v-btn
      >
    </v-row>
  </v-container>
</template>

<script>
import Swal from 'sweetalert2';
import axios from 'axios';
import { mapState, mapActions } from 'vuex';

export default {
  props: {
    questions: null,
  },
  data: () => ({
    choosenQuestion: null,
    questionIndex: 0,
    answer: null,
  }),
  created() {
    this.choosenQuestion = this.questions[this.questionIndex];
  },
  computed: {
    ...mapState({
      user: state => state.edu.user,
      userXP: state => state.edu.userXP,
      xpOfUsersLevel: state => state.edu.xpOfUsersLevel,
    }),
  },
  methods: {
    ...mapActions['fetchUser'],
    nextQuestion() {
      console.log(this.questions.length, this.questionIndex);

      if (!this.questionIndex <= this.questions.length) {
        this.questionIndex++;
        this.choosenQuestion = this.questions[this.questionIndex];
      }
    },
    previousQuestion() {
      this.questionIndex--;
      this.choosenQuestion = this.questions[this.questionIndex];
    },
    backToCourses() {
      this.$router.push({ path: '/' });
    },
    async answerQuestion() {
      if (this.answer === this.choosenQuestion.correctAnswer) {
        try {
          const response = await axios.post(
            `https://localhost:44382/api/questions/answer/${this.choosenQuestion.questionID}?userId=${this.user.Id}&answer=${this.answer}`,
          );
          this.presentToast('success', 'Correct Answer 🙂');
          this.nextQuestion();
          this.answer = null;

          this.$store.dispatch('fetchUser');

          this.$store.dispatch('updateUserXP');

          console.log(this.userXP);

          if (this.user.Level === (this.user.Level += 1)) {
            Swal.fire({
              title: "You've leveled up!",
              width: 600,
              padding: '3em',
              background: '#fff url(/images/trees.png)',
              backdrop: `
                      rgba(0,0,123,0.4)
                      url("/images/nyan-cat.gif")
                      left top
                      no-repeat
                                  `,
            });
            this.$store.commit('resetXPBar', 0);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        this.presentToast('error', 'Incorrect Answer 😟');
      }
    },
    presentToast(icon, title) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        onOpen: toast => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon,
        title,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.v-text-field input {
  font-size: 2.2em;
}
</style>
