<template>
    <div>tab</div>
    <nav>
  <div class="nav nav-tabs" id="nav-tab" role="tablist">
    <button
      class="nav-link active"
      id="nav-home-tab"
      data-bs-toggle="tab"
      data-bs-target={{#}}+{{tablist[0]}}
      type="button"
      role="tab"
      aria-controls={{tablist[0]}}
      aria-selected="true"
      v-on:click="tabCilck(tablist[0])"
    >
      Home
    </button>
    <button
      class="nav-link"
      id="nav-profile-tab"
      data-bs-toggle="tab"
      data-bs-target={{#}}+{{tablist[1]}}
      type="button"
      role="tab"
      aria-controls={{tablist[1]}}
      aria-selected="false"
      v-on:click="tabCilck(tablist[1])"
    >
      Profile
    </button>
    <button
      class="nav-link"
      id="nav-contact-tab"
      data-bs-toggle="tab"
      data-bs-target={{#}}+{{tablist[2]}}
      type="button"
      role="tab"
      aria-controls={{tablist[2]}}
      aria-selected="false"
      v-on:click="tabCilck(tablist[2])"
    >
      Contact
    </button>
  </div>
</nav>
<div class="tab-content" id="nav-tabContent">
  <div
    class="tab-pane fade show active"
    id="nav-home"
    role="tabpanel"
    aria-labelledby="nav-home-tab"
  >
    <table class="table">
      <thead>
        <tr>
          <th>1</th>
          <th>2</th>
          </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
        </tr>
        </tbody>
      </table>
  </div>
  <div
    class="tab-pane fade show"
    id="nav-profile"
    role="tabpanel"
    aria-labelledby="nav-profile-tab"
  >
    nav-profile
  </div>
  <div
    class="tab-pane fade show"
    id="nav-contact"
    role="tabpanel"
    aria-labelledby="nav-contact-tab"
  >
    nav-contact
  </div>
</div>
</template>
<script setup>
const tablist=["nav-home","nav-profile","nav-contact"]
const tabnamelist=["nav-home-tab","nav-profile-tab","nav-contact-tab"]
function tabCilck(tabname){
    //タブ全非表示
    for(let i=0;i<tablist.length;i++){
        //let tab=document.getElementById(tablist[i]+"-tab")
        let tab=document.getElementById(tabnamelist[i])
        let tabContent=document.getElementById(tablist[i])
        tab.classList.remove("active")
        tabContent.classList.remove("active")
    }
    //現在選択したタブを表示
    let tab=document.getElementById(tabname+"-tab")
    let tabContent=document.getElementById(tabname)
    tab.classList.add("active")
    tabContent.classList.add("active")
}
</script>
<style scoped>
.tab-content{
  background-color: beige;
  border:0.1rem solid #aaaaaa;
  height:20vh;
  border-radius: 0rem 0rem 1rem 1rem;
}
.nav-link{
  background-color: beige;
}
table{
  margin-left:25%;
  margin-right:25%;
  width:50%
}
th{
  border:0.1rem solid #111111;
}
td{
  border:0.1rem solid #111111;
}
</style>