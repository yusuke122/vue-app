<script setup>
import { onMounted, ref } from 'vue'
import Map from 'ol/Map.js'
import View from 'ol/View.js'
import { toLonLat, fromLonlat } from 'ol/proj.js'
import { toStringHDMS } from 'ol/coordinate.js'
import { firstMap, secondMap, thirdMap } from '../modules/drawLayers.js'
import { MACRO_TEXT } from '../assets/MACRO_TEXT.js'

//
let map //mapインスタンス
const nowmap = ref(firstMap) //レイヤ設定

//popup
/**overlay インスタンス */
const overlay = new Overlay({
  element: getContainerElement(),
  autoPan: {
    animation: {
      duration: 250,
    },
  },
})

onMounted(() => {
  drawMap() /**初期描画 */
})
function getContainerElement() {}
function setDrawLayers() {
  //firstlayer
  var firstlayer = nowmap

  //secondlayer
  var secondlayer = ''

  //thirdlayer
  var thirdlayer = ''
  //pattern1

  //pattern2
  let layers = [firstlayer, secondlayer, thirdlayer]
  return layers
}
function drawMap() {
  /**初回の描画 */
  map = new Map({
    target: 'map',
    view: new View({
      center: [fromLonlat(MACRO_TEXT.centerPos)],
      zoom: 12,
    }),
  })
  map.setLayers(setDrawLayers())
  map.addControl(setDrawControls())
  map.addOverlay(setDrawOverlay())
}
function redrawMap() {
  map.removeLayer()
  map.addLayer()
}
</script>
<template>
  <div id="map" class="map"></div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
  .map {
    height: 83vh;
    width: 96vw;
  }
}
</style>
