
<script>
//import HelloWorld from './components/HelloWorld.vue'
//import MainMap from './components/MainMap.vue';
//import CustomThunder from "./components/CustomThunder.vue";
import BsTest from './components/BsTest.vue';
import NavHeader from './components/NavHeader.vue';


export default {
  name: 'App',
  components: {
    //HelloWorld,
    //MainMap,
    //CustomThunder
    NavHeader,//navからappへデータを渡す 子から親
    BsTest//navからもらったページのデータを渡す 親から子
  },
  data(){
    return{
      pagetitle: 'Navbar',  // $eventで渡したデータを格納 ここで設定するのは初期値
      methodData: '', // メソッドで渡したデータを格納
    }
  }
}

</script>
<template>
  <!--img alt="Vue logo" src="./assets/logo.png"-->
  <!--HelloWorld msg="Welcome to Your Vue.js App"/-->
  <!--MainMap/-->
  <!--CustomThunder/-->
  <NavHeader
  v-on:childData="pagetitle = $event"
  />
  <BsTest
   :titleStr="pagetitle"
  />
  <div> 親 : {{pagetitle}}</div>
</template>

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
