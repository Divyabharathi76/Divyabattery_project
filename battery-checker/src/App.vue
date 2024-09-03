<template>
 <div id="app">
 <BatteryChecker/>
 </div>
</template>

<script>
import BatteryChecker from './components/BatteryChecker.vue'

export default {
  name: 'App',
  components: {
    BatteryChecker
  }
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
}
</style>
