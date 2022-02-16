<template>
  <h2>Counter</h2>
  <p>{{ counter }} <sup>2</sup> = {{ squaredCounter }}</p>
  <div>
    <button v-on:click="increase()">+1</button>
    <button v-on:click="decrease()">-1</button>
  </div>
</template>

<script>
export default {
  name: 'Counter',
  data() {
    return {
      counter: 5,
    };
  },
  methods: {
    increase() {
      this.counter++;
    },
    decrease() {
      this.counter--;
    },
  },
  computed: {
    squaredCounter() {
      console.log('Computed counter');
      return this.counter * this.counter;
    },
  },
};
</script>

<style>
button {
  background-color: #64bb87;
  border: 1px solid white;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  margin: 0 5px;
  padding: 5px 15px;
  transition: 0.3s ease-in-out;
}

button:hover {
  background-color: #5aa67b;
  transition: 0.3s ease-in-out;
}
</style>
