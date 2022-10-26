<template>
  <tic-tac-toe />
</template>

<script>
import TicTacToe from "./components/tic-tac-toe";

export default {
  name: 'App',
  components: {
    TicTacToe,
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
