<template>
    <div id="map" class="map"></div>
</template>
<script>
export default {
  name: 'CustomThunder',
  props: {
    msg: String
  }
}
import KML from 'ol/format/KML.js';
import Map from 'ol/Map.js';
import Polygon from 'ol/geom/Polygon.js';
import StadiaMaps from 'ol/source/StadiaMaps.js';
import VectorSource from 'ol/source/Vector.js';
import View from 'ol/View.js';
import {Fill, Icon, Stroke, Style} from 'ol/style.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import {toContext} from 'ol/render.js';

const symbol = [
  [0, 0],
  [4, 2],
  [6, 0],
  [10, 5],
  [6, 3],
  [4, 5],
  [0, 0],
];
window.addEventListener("load",function(){
const defStyle =   new Style({
        fill: new Fill({color: 'rgba(255, 153, 0, 0.4)'}),
        stroke: new Stroke({color: 'rgba(255, 204, 0, 0.2)', width: 2}),
      })
console.log(defStyle)
let scale;
const scaleFunction = function (coordinate) {
  return [coordinate[0] * scale, coordinate[1] * scale];
};

const styleCache = {};
const styleFunction = function (feature) {
  // 2012_Earthquakes_Mag5.kml stores the magnitude of each earthquake in a
  // standards-violating <magnitude> tag in each Placemark.  We extract it from
  // the Placemark's name instead.
  console.log(feature)
  const name = feature.get('name');
  const magnitude = parseFloat(name.substr(2));
  let size = parseInt(10 + 40 * (magnitude - 5), 10);
  size*=10
  scale = size / 10;
  let style = styleCache[size];
  if (!style) {
    const canvas = document.createElement('canvas');
    const vectorContext = toContext(canvas.getContext('2d'), {
      size: [size, size],
      pixelRatio: 1,
    });
    vectorContext.setStyle(
      new Style({
        fill: new Fill({color: 'rgba(255, 153, 0, 0.4)'}),
        stroke: new Stroke({color: 'rgba(255, 204, 0, 0.2)', width: 2}),
        renderer(coordinates, state) {
            const [[x, y], [x1, y1]] = coordinates;
            console.log(coordinates)
            const ctx = state.context;
            const dx = x1 - x;
            const dy = y1 - y;
            const radius = Math.sqrt(dx * dx + dy * dy);

            const innerRadius = 0;
            const outerRadius = radius * 1.4;

            const gradient = ctx.createRadialGradient(
                x,
                y,
                innerRadius,
                x,
                y,
                outerRadius,
            );
            gradient.addColorStop(0, 'rgba(255,0,0,0)');
            gradient.addColorStop(0.6, 'rgba(255,0,0,0.2)');
            gradient.addColorStop(1, 'rgba(255,0,0,0.8)');
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
            ctx.fillStyle = gradient;
            ctx.fill();

            ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
            ctx.strokeStyle = 'rgba(255,0,0,1)';
            ctx.stroke();
        },
      }),
    );
    vectorContext.drawGeometry(new Polygon([symbol.map(scaleFunction)]));
    style = new Style({
      image: new Icon({
        img: canvas,
        rotation: 1.2,
      }),
    });
    styleCache[size] = style;
  }
  return style;
};

const vector = new VectorLayer({
  source: new VectorSource({
    url: 'data/kml/sample.kml',
    format: new KML({
      extractStyles: false,
    }),
  }),
  style: styleFunction,
});

const raster = new TileLayer({
  source: new StadiaMaps({
    layer: 'stamen_toner',
  }),
});

const map = new Map({
  layers: [raster, vector],
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});
console.log(map)
})
</script>
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.map {
        width: 100%;
        height: 100vh;
}
</style>