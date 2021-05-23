<template>
  <Header />
  <idle-game />
</template>

<script>
import IdleGame from './components/IdleGame'
import Header from './components/Header'

export default {
  name: 'App',
  components: {
    IdleGame,
    Header
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

</style>
