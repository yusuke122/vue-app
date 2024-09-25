
<script>
import GrandC1 from "../components/GrandC1.vue"
import GrandC2 from "../components/GrandC2.vue"
import GrandC3 from "../components/GrandC3.vue"
export default({
  props: ['titleStr'],
  components: {
    GrandC1,
    GrandC2,
    GrandC3,
  },
})

</script>
<template>
    <div class="page">
        <div class="tab_area">
            子：{{ titleStr }}
        </div>
        <div v-if="titleStr=='dropdown'">
            <GrandC1/>
        </div>
        <div v-if="titleStr=='Navbar'">
            <GrandC2/>
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