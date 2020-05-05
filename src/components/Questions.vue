<template>
  <v-container>
    <v-row>
      <v-btn text @click="backToCourses">
        <v-icon>mdi-arrow-left</v-icon> Back
      </v-btn>
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
      <v-btn @click="answerQuestion">Check answer</v-btn>
    </v-row>
  </v-container>
</template>

<script>
import Swal from 'sweetalert2';

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
  methods: {
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
    answerQuestion() {
      if (this.answer === null) {
        this.presentToast('error', 'Please answer the question 😟');
      } else {
        if (this.answer === this.choosenQuestion.correctAnswer) {
          this.presentToast('success', 'Correct Answer 🙂');
          this.nextQuestion();
          this.answer = null;
        } else {
          this.presentToast('error', 'Incorrect Answer 😟');
        }
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
