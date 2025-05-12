<script setup>
import Overlay from 'ol/Overlay.js'

let container
let content
let closer

 const overlay = new Overlay({
    element: container,
    autoPan: {
      animation: {
        duration: 250,
      },
    },
  })

//let newCtl=defaultControls().extend(new ScaleLine())
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

function getContainerElement() {
  container = document.getElementById('popup')
  return container
}
function getContentElement() {
  content = document.getElementById('popup-content')
  return content
}
function getCloserElement() {
  closer = document.getElementById('popup-closer')
  return closer
}
</script>
