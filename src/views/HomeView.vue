<script setup>
import ImageTile from 'ol/source/ImageTile.js'
import Map from 'ol/Map.js'
import Overlay from 'ol/Overlay.js'
import TileLayer from 'ol/layer/Tile.js'
import View from 'ol/View.js'
import { toLonLat, fromLonLat } from 'ol/proj'
import { toStringHDMS } from 'ol/coordinate.js'
import { ref, onMounted, watch, reactive } from 'vue'
import { firstMap, secondMap, thirdMap } from '../modules/drawLayers'
import { ScaleLine, defaults as defaultControls } from 'ol/control.js'
import CalendarArea from '@/components/CalendarArea.vue'
import TableArea from '@/components/TableArea.vue'
import LineArea from '@/components/LineArea.vue'
import TemplateParent from '@/components/TemplateParent.vue'

const map=reactive(null)
let btn_title = ['', '', '', '', '', '', '', '', '', '', '天気を表示']
//popup_mode
const popup_mode = ref(2)
const musen_pos_x = ref('')
const musen_pos_y = ref('')
watch(musen_pos_x, async () => {
  //console.log(musen_pos_x)
})
watch(musen_pos_y, async () => {
  //console.log(musen_pos_y)
})
//data
//popup_musen
let popup_musen_arr = [
  /*{ id: 0, title: '位置', data: '' },
  { id: 1, title: '位置', data: '' },
    { id: 2, title: '位置', data: '' },
    { id: 3, title: '位置', data: '' },*/
]

//popup_musen_table
let popup_musen_table_arr = [
  { id: 0, title: '関東', data: '良' },
  { id: 1, title: '東北', data: '良' },
  { id: 2, title: '北九州', data: '可' },
  { id: 3, title: '近畿', data: '不可' },
]

let popup_group_table_arr = [
  { id: 0, title: '天気', data: '1' },
  { id: 1, title: '晴れ', data: '1' },
  { id: 2, title: '晴れ', data: '1' },
  { id: 3, title: '雨', data: '1' },
  { id: 4, title: 'くもり', data: '1' },
  { id: 5, title: 'くもり', data: '1' },
]

//offcanvas
//0:display:none 1:display:normal
const offcanvas_mode = ref(0)

onMounted(() => {
  /**
   * Elements that make up the popup.
   */
  const container = document.getElementById('popup')
  const content = document.getElementById('popup-content')
  const closer = document.getElementById('popup-closer')
  const popup_musen = document.getElementById('popup_musen')
  const popup_group = document.getElementById('popup_group')
  const popup_BOUEI_area = document.getElementById('popup_BOUEI_area')
  const popup_MINKAN_area = document.getElementById('popup_MINKAN_area')
  /**
   * Create an overlay to anchor the popup to the map.
   */
  /*const overlay = new Overlay({
    element: container,
    autoPan: {
      animation: {
        duration: 250,
      },
    },
  })*/

  /**
   * Add a click handler to hide the popup.
   * @return {boolean} Don't follow the href.
   */
  /*closer.onclick = function () {
    overlay.setPosition(undefined)
    closer.blur()
    return false
  }*/

  /**control */
  let controls = []
  //scale
  /*const scaleControl = new ScaleLine({
    units: 'metric',
    bar: true,
    steps: 4,
    text: true,
    minWidth: 140,
  })*/

  /** */

  /**
   * Create the map.
   */
  let layers = [firstMap]
  map.value = new Map({
    controls: defaultControls().extend(new ScaleLine()),
    layers: layers,
    //overlays: [overlay],
    target: 'map',
    view: new View({
      center: fromLonLat([139.7114, 35.6814]),
      zoom: 11,
    }),
  })

  /**
   * Add a click handler to the map to render the popup.
   */
  /*map.on('singleclick', function (evt) {
    const coordinate = evt.coordinate
    var coor = toLonLat(coordinate)
    musen_pos_x.value = Number(Math.floor(coor[0] * 1000000) / 1000000)
    musen_pos_y.value = Number(Math.floor(coor[1] * 1000000) / 1000000)

    if (popup_mode.value == 0) {
      content.innerHTML =
        '<div style="color:#ffffff">無線位置：[' +
        musen_pos_x.value +
        ',' +
        musen_pos_y.value +
        ']</div>'
      content.appendChild(popup_musen)
    } else if (popup_mode.value == 1) {
      content.innerHTML =
        '<div style="line-height:1rem;margin-bottom:1vh;"><div style="color:#ffffff">グループ番号：[' +
        '1' +
        ']</div>' +
        '<div style="color:#ffffff">会社ID：[' +
        '1' +
        ']</div>' +
        '<div style="color:#ffffff">会社ID：[' +
        '1' +
        ']</div>' +
        '<div style="color:#ffffff">会社ID：[' +
        '1' +
        ']</div>' +
        '<div style="color:#ffffff">会社ID：[' +
        '1' +
        ']</div>' +
        '<div style="color:#ffffff">会社ID：[' +
        '1' +
        ']</div></div>'
      content.appendChild(popup_group)
    } else if (popup_mode.value == 2) {
      content.innerHTML =
        '<div style="color:#ffffff">座標：[' +
        musen_pos_x.value +
        ',' +
        musen_pos_y.value +
        ']</div>'
      content.appendChild(popup_BOUEI_area)
    } else if (popup_mode.value == 3) {
      content.innerHTML =
        '<div style="color:#ffffff">無線位置：[' +
        musen_pos_x.value +
        ',' +
        musen_pos_y.value +
        ']</div>'
      content.appendChild(popup_MINKAN_area)
    }
    content.style.marginTop = '3.5vh'
    content.style.marginRight = '2vw;'
    content.style.height = '20vh'
    content.style.width = '22vw'
    content.style.overflowY = 'scroll'
    content.style.scrollbarColor = '#555555 #222222'
    //content.style.scrollbarWidth = 'thin'
    overlay.setPosition(coordinate)
  })*/
})
</script>
<template>
  <div id="map" class="map"></div>
  <!--div id="popup" class="ol-popup">
    <a href="#" id="popup-closer" class="ol-popup-closer"></a>
    <div id="popup-content"></div>
  </div-->
  <!------------------------>
  <div style="display: none">
    <div id="popup_musen">
      <table class="table musen_status_area">
        <tbody>
          <tr
            v-for="data in popup_musen_arr"
            v-bind:key="data.id"
            style="color: #aaaaaa"
          >
            <td>{{ data.title }}</td>
            <td>{{ data.data }}</td>
          </tr>
        </tbody>
      </table>
      <div
        style="width: 20vw; color: #ffffff; border-top: 0.1rem dashed #aaaaaa"
      >
        [天気]
      </div>
      <table class="table striped bordered musen_conn_status_area">
        <tbody>
          <tr v-for="data in popup_musen_table_arr" v-bind:key="data.id">
            <td>{{ data.title }}</td>
            <td style="width: 10vw">{{ data.data }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <!------------------------>
  <div style="display: none">
    <div id="popup_group">
      <div
        style="width: 20vw; color: #ffffff; border-top: 0.1rem dashed #aaaaaa"
      >
        [天気]
      </div>
      <table class="table striped bordered musen_conn_status_area">
        <tbody>
          <tr v-for="data in popup_group_table_arr" v-bind:key="data.id">
            <td>{{ data.title }}</td>
            <td style="width: 10vw">{{ data.data }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <!------------------------>
  <!------------------------>
  <div style="display: none">
    <div id="popup_BOUEI_area">
      <div
        style="width: 20vw; color: #ffffff; border-top: 0.1rem dashed #aaaaaa"
      >
        [天気]
      </div>
      <table class="table striped bordered musen_conn_status_area">
        <tbody>
          <tr v-for="data in popup_group_table_arr" v-bind:key="data.id">
            <td>{{ data.title }}</td>
            <td style="width: 10vw">{{ data.data }}</td>
          </tr>
        </tbody>
      </table>
      <div style="text-align: right; border: 0.1rem solid transparent">
        <button
          type="button"
          class="btn btn-secondary"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasBottom"
          aria-controls="offcanvasBottom"
          style="font-size: 0.8rem; margin-right: 1vw; margin-top: -1vh"
        >
          {{ btn_title[10] }}
        </button>
      </div>
    </div>
  </div>
  <!------------------------>
  <!------------------------>
  <div style="display: none">
    <div id="popup_MINKAN_area">
      <div
        style="width: 20vw; color: #ffffff; border-top: 0.1rem dashed #aaaaaa"
      >
        [天気]
      </div>
      <table class="table striped bordered musen_conn_status_area">
        <tbody>
          <tr v-for="data in popup_group_table_arr" v-bind:key="data.id">
            <td>{{ data.title }}</td>
            <td style="width: 10vw">{{ data.data }}</td>
          </tr>
        </tbody>
      </table>
      <div style="align-items: right">
        <button
          type="button"
          class="btn btn-secondary"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasBottom"
          aria-controls="offcanvasBottom"
          style="font-size: 0.8rem; margin-right: 1vw; margin-top: -1vh"
        >
          {{ btn_title[10] }}
        </button>
      </div>
    </div>
  </div>
  <!------------------------>
  <div
    class="offcanvas offcanvas-bottom text-bg-dark"
    tabindex="-1"
    id="offcanvasBottom"
    aria-labelledby="offcanvasBottomLabel"
    style="
      width: 98vw;
      height: 70vh;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 10vh;
      border-radius: 1rem;
    "
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasBottomLabel" style="height: 2vh">
        天気
      </h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div
      class="offcanvas-body small"
      style="background-color: #444444; border-radius: 0rem 0rem 1rem 1rem"
    >
      <div
        class=""
        style="
          display: inline-block;
          width: 43%;
          font-size: 0.9rem;
          vertical-align: top;
        "
      >
        <!--FullCalendar
          :options="calendarOptions"
          style="color: black; background-color: #ffffff"
        /-->
        <Datepicker v-model="picked" :locale="jp" />
        <!--CalendarArea / -->
        <TableArea />
      </div>
      <div
        class=""
        style="display: inline-block; width: 57%; vertical-align: top"
      >
        <div>
          <!--LineArea /-->
        </div>
      </div>
    </div>
  </div>
  <!------------------------>
    <TemplateParent />
</template>
<style scoped>
.map {
  width: 99vw;
  height: 90vh;
  margin-left: -5rem;
}
.ol-popup {
  position: absolute;
  background-color: #444444;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  border: 0.1rem solid #aaaaaa;
  bottom: 12px;
  left: -50px;
  min-width: 280px;
  padding-top: 1vh;
  padding-left: 2vw;
  padding-right: 0vw;
  padding-bottom: 1vh;
  font-size: 0.9rem;
}
.ol-popup:after,
.ol-popup:before {
  top: 100%;
  border: solid transparent;
  content: ' ';
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}
.ol-popup:after {
  border-top-color: #444444;
  border-width: 10px;
  left: 48px;
  margin-left: -10px;
}
.ol-popup:before {
  border-top-color: #444444;
  border-width: 11px;
  left: 48px;
  margin-left: -11px;
}
.ol-popup-closer {
  text-decoration: none;
  position: absolute;
  top: 2px;
  right: 8px;
  background-color: transparent;
}
.ol-popup-closer:after {
  content: '✖';
  color: #aaaaaa;
  background-color: transparent;
}
.ol-popup table {
  /*background-color: #aaaaaa;*/
  width: 20vw;
}
.ol-popup table tr {
  margin-left: auto;
  margin-right: auto;
  background-color: #666666;
  border: 0.1rem solid #aaaaaa;
}
.ol-popup table td {
  color: #ffffff;
  border: 0.1rem solid #aaaaaa;
  background-color: #666666;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  padding-top: 0rem;
  padding-bottom: 0rem;
}
.section::-webkit-scrollbar-track {
  background-color: darkgrey;
}
</style>
