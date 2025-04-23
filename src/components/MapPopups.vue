<script setup>
import Overlay from 'ol/Overlay.js'

let container
let content
let closer

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
