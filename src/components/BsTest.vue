
<script>
import PopupCompPage from "../components/PopupCompPage.vue"
import TabCompPage from "../components/TabCompPage.vue"
import GrandC3 from "../components/GrandC3.vue"
export default({
  props: ['titleStr'],
  components: {
    PopupCompPage,
    TabCompPage,
    GrandC3,
  },
})

</script>
<template>
    <div class="page">
        <div class="tab_area">
            子：{{ titleStr }}
        </div>
        <div v-if="titleStr=='Popup'">
            <PopupCompPage/>
        </div>
        <div v-if="titleStr=='Tab'">
            <TabCompPage/>
        </div>
        <div v-if="titleStr=='Home'">
            <GrandC3/>
        </div>
    </div>
</template>
<style scoped>
.page{

}
.tab_area{

}
</style>