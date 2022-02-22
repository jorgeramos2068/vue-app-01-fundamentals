<template>
  <img v-if="image" :src="image" alt="bg" />
  <div class="bg-dark"></div>
  <div class="indecision-container">
    <input type="text" placeholder="Ask me a question" v-model="question" />
    <p>Remember to finish with a ?</p>
    <div v-if="isValidQuestion">
      <h2>{{ question }}</h2>
      <h1>{{ answer }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Indecision',
  data() {
    return {
      question: null,
      answer: null,
      image: null,
      isValidQuestion: false,
    };
  },
  methods: {
    async getAnswer() {
      try {
        this.answer = 'Loading...';
        const { answer, image } = await fetch('https://yesno.wtf/api').then(
          resp => resp.json()
        );
        this.answer = answer;
        this.image = image;
      } catch (err) {
        console.error(err);
      }
    },
  },
  watch: {
    question(value, oldValue) {
      this.isValidQuestion = false;
      if (!value.endsWith('?')) {
        return;
      }
      this.isValidQuestion = true;
      this.getAnswer();
    },
  },
};
</script>

<style scoped>
img,
.bg-dark {
  height: 100vh;
  left: 0px;
  max-height: 100%;
  max-width: 100%;
  position: fixed;
  top: 0px;
  width: 100vw;
}

.bg-dark {
  background-color: rgba(0, 0, 0, 0.4);
}

.indecision-container {
  position: relative;
  z-index: 99;
}

input {
  border: none;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 10px 15px;
  width: 250px;
}
input:focus {
  outline: none;
}

p {
  color: white;
  font-size: 20px;
  margin-top: 0px;
}

h1,
h2 {
  color: white;
}

h2 {
  margin-top: 150px;
}
</style>
