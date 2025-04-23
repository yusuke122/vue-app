import Overlay from 'ol/Overlay.js'

let container
let content
let closer
/**overlay インスタンス */
export const overlay = new Overlay({
  element: getContainerElement(),
  autoPan: {
    animation: {
      duration: 250,
    },
  },
})

export function getContainerElement() {
  container = document.getElementById('container')
}
