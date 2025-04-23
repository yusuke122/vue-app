import TileLayer from 'ol/layer/Tile.js'
import ImageTile from 'ol/source/ImageTile.js'

//first map
export const firstMap = new TileLayer({
  source: new ImageTile({
    url: 'https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png',
    //tileSize: 512,
  }),
})

//second map
export const secondMap = new TileLayer({
  source: new ImageTile({
    url: 'https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png',
    //tileSize: 512,
  }),
})

//thirdmap
export const thirdMap = new TileLayer({
  source: new ImageTile({
    url: 'https://cyberjapandata.gsi.go.jp/xyz/blank/{z}/{x}/{y}.png',
    //tileSize: 512,
  }),
})
