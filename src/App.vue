<template>
  <!--img alt="Vue logo" src="./assets/logo.png"-->
  <!--HelloWorld msg="Welcome to Your Vue.js App"/-->
  <MainMap/>
  <!--CustomThunder/-->
</template>
<script>
//import HelloWorld from './components/HelloWorld.vue'
import MainMap from './components/MainMap.vue';
//import CustomThunder from "./components/CustomThunder.vue";

export default {
  name: 'App',
  components: {
    //HelloWorld,
    MainMap,
    //CustomThunder
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
