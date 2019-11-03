<template>
  <div id="app">
    <user />
  </div>
</template>

<script>
import User from './components/User.vue'

export default {
  name: 'app',
  components: {
    User
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0 auto;
  width: 65%;

}
</style>
