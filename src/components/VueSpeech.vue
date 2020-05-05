<template>
  <div>
    <!-- <vue-speech @onTranscriptionEnd="onEnd" class="d-none" /> -->
    <!-- <vue-speech /> -->
  </div>
</template>

<script>
export default {
  methods: {
    onEnd({ lastSentence, transcription }) {
      // `lastSentence` is the last sentence before the pause
      // `transcription` is the full array of sentences
      console.log(lastSentence);
      localStorage.setItem('answer', lastSentence);
    },
  },
};
</script>

<style lang="scss">
p {
  font-size: 24px;
  padding: 20px;
}
</style>
