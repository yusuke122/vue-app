<script setup>
import {ref} from "vue";
function navMenuClick(pagename){
  console.log(pagename)
  title.value=pagename
}
const title=ref("nav")
</script>
<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <span style="margin-right: 5vw;">{{ title }}</span>
  <span class="navbar-brand" href="#" v-on:click='$emit("childData","Navbar");navMenuClick("Navbar")'>Navbar</span>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active" v-on:click='$emit("childData","Home");navMenuClick("Home")'>Home <span class="sr-only">(current)</span>
      </li>
      <li class="nav-item">
        <span class="nav-link" href="#" v-on:click='$emit("childData","Link");navMenuClick("Link")'>Link</span>
      </li>
      <li class="nav-item dropdown">
        <span class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" 
        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" 
        v-on:click='$emit("childData","dropdown");navMenuClick("dropdown");'
        >
          親へ渡す
        </span>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <span class="dropdown-item" href="#">Action</span>
          <span class="dropdown-item" href="#">Another action</span>
          <div class="dropdown-divider"></div>
          <span class="dropdown-item" href="#">Something else here</span>
        </div>
      </li>
      <li class="nav-item">
        <span class="nav-link" href="#" 
        v-on:click='$emit("childData","親へ渡すデータ");navMenuClick("Disabled");'
        >Disabled</span>
      </li>
    </ul>
  </div>
</nav>
</template>