<template>
  <v-container>
    <v-row>
      <v-col>
        <p class="title">To begin select a difficulty & question type.</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-form>
          <v-select
            @change="fetchTriviaQuestions"
            outlined
            :items="difficultyOptions"
            dark
            label="Difficulty"
            color="purple"
            v-model="choosenDifficulty"
          ></v-select>

          <v-select
            @change="fetchTriviaQuestions"
            outlined
            :items="typeOptions"
            dark
            label="Type"
            color="purple"
            v-model="choosenType"
          ></v-select>
        </v-form>
      </v-col>
    </v-row>

    <v-row v-if="choosenQuestion">
      <v-row justify="center" align="center">
        <v-col>
          <v-btn @click="changeQuestion('previous')" icon>
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-col cols="10">
        <p class="title">Difficulty: {{ choosenQuestion.difficulty }}</p>
        <p class="title">Category: {{ choosenQuestion.category }}</p>
        <p class="title">Question: {{ choosenQuestion.question }}</p>

        <v-list dark color="primary">
          <v-list-item-group>
            <v-list-item
              v-for="(ans, i) in choosenQuestion.incorrect_answers"
              :key="i"
              @change="answerTriviaQuestion(ans)"
            >
              <v-list-item-content>
                <v-list-item-title v-text="ans"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              @change="answerTriviaQuestion(choosenQuestion.correct_answer)"
            >
              <v-list-item-content>
                <v-list-item-title>{{
                  choosenQuestion.correct_answer
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
      <v-row justify="center" align="center">
        <v-col>
          <v-btn @click="changeQuestion('next')" icon>
            <v-icon>mdi-arrow-right</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  data: () => ({
    choosenQuestionIndex: 0,
    choosenQuestion: null,
    triviaQuestions: [],
    choosenDifficulty: null,
    choosenType: null,
    difficultyOptions: ['Easy', 'Medium', 'Hard'],
    typeOptions: [
      { text: 'Multiple Choice', value: 'multiple' },
      { text: 'True / False', value: 'boolean' },
    ],
  }),
  methods: {
    async fetchTriviaQuestions(id) {
      try {
        if (this.choosenDifficulty !== null && this.choosenType !== null) {
          this.$store.commit('setShowLoading', true);
          const url = `https://opentdb.com/api.php?amount=10&category=${
            this.$route.params.id
          }&difficulty=${this.choosenDifficulty.toLowerCase()}&type=${
            this.choosenType
          }`;

          const { data } = await axios.get(url);

          this.triviaQuestions = data.results;

          this.$store.commit('setShowLoading', false);

          this.choosenQuestion = this.triviaQuestions[
            this.choosenQuestionIndex
          ];
        }
      } catch (error) {
        console.error(error);
      }
    },
    changeQuestion(value) {
      if (value === 'next') {
        if (this.choosenQuestionIndex !== this.triviaQuestions.length - 1) {
          this.choosenQuestionIndex++;
        }
      } else {
        if (this.choosenQuestionIndex !== 0) {
          this.choosenQuestionIndex--;
        }
      }

      this.choosenQuestion = this.triviaQuestions[this.choosenQuestionIndex];
    },
    answerTriviaQuestion(ans) {
      if (ans === this.choosenQuestion.correct_answer) {
        this.presentToast('success', 'Correct Answer!');
        this.changeQuestion('next');
      } else {
        this.presentToast('error', 'Incorrect Answer!');
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

<style></style>
