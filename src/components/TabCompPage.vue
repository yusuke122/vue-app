<template>
    <div>tab</div>
    <nav>
  <div class="nav nav-tabs" id="nav-tab" role="tablist">
    <button
      class="nav-link active"
      id="nav-home-tab"
      data-bs-toggle="tab"
      data-bs-target="#nav-home"
      type="button"
      role="tab"
      aria-controls="nav-home"
      aria-selected="true"
      v-on:click="tabCilck('nav-home')"
    >
      Home
    </button>
    <button
      class="nav-link"
      id="nav-profile-tab"
      data-bs-toggle="tab"
      data-bs-target="#nav-profile"
      type="button"
      role="tab"
      aria-controls="nav-profile"
      aria-selected="false"
      v-on:click="tabCilck('nav-profile')"
    >
      Profile
    </button>
    <button
      class="nav-link"
      id="nav-contact-tab"
      data-bs-toggle="tab"
      data-bs-target="#nav-contact"
      type="button"
      role="tab"
      aria-controls="nav-contact"
      aria-selected="false"
      v-on:click="tabCilck('nav-contact')"
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
    nav-home
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
function tabCilck(tabname){
    //タブ全非表示
    const tablist=["nav-home","nav-profile","nav-contact"]
    for(let i=0;i<tablist.length;i++){
        let tab=document.getElementById(tablist[i]+"-tab")
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