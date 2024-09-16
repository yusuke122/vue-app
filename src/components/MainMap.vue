<template>
    <div id="map" class="map"></div>
</template>
<script>
export default {
  name: 'MainMap',
  props: {
    msg: String
  }
}
import Feature from 'ol/Feature.js';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import {Circle} from 'ol/geom.js';
import {/*OSM,*/ Vector as VectorSource} from 'ol/source.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import Polygon from 'ol/geom/Polygon.js';
import {Fill, Icon, Stroke, Style} from 'ol/style.js';
import {toContext} from 'ol/render.js';
import StadiaMaps from 'ol/source/StadiaMaps.js';
const defZoom = 19

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
    let featuredraw = true
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
  const size = parseInt(10 + 40 * (magnitude - 5), 10);
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
        scale:1,
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
let coor = [12127398.797692968, 4063894.123105166]
const circleFeature = new Feature({
  geometry: new Circle([coor[0], coor[1]], 50),
});
/*
let circleFeature = new Feature({
    geometry: new Point(coor[0],coor[1])
})*/
circleFeature.setStyle(
  new Style({
    fill: new Fill({color: 'rgba(255, 153, 0, 0.4)'}),
    stroke: new Stroke({color: 'rgba(255, 204, 0, 0.2)', width: 2}),
    renderer(coordinates, state) {
      //console.log(state.geometry.flatCoordinates)
      if(featuredraw){
      const [[x, y], [x1, y1]] = coordinates;
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
      }else{
        console.log("no redraw")
      }
    },
  }),
);
circleFeature.getGeometry().set("value",{type:'circle',num:1},true)

const raster = new TileLayer({
  source: new StadiaMaps({
    layer: 'stamen_toner',
  }),
});

const vs = new VectorSource({
        features: [circleFeature],
        style: styleFunction,
});
console.log(vs)

//console.log(this)
//var polyboundRefresh = new this.Strategy.Refresh({force: true});

//.refresh({force:true});
let vl = new VectorLayer({
      source: vs,
      //'displayInLayerSwitcher':false,
      //Strategies:[polyboundRefresh]
    })

const map = new Map({
  layers: [
    /*new TileLayer({
      source: new OSM(),
      visible: true,
    }),*/
    raster,
    vl
  ],
  target: 'map',
  view: new View({
    center: [12127398.797692968, 4063894.123105166],
    zoom: defZoom,
  }),
});
//moveend 
map.on("moveend",function(){
    console.log('zoom: ' + map.getView().getZoom());
            // update the style's pointRadius 
        // style.pointRadius = newRadius;

        // OR
        // resize each individual point feature 
        // loop through the point features
            // pointFeature.geometry.resize(scale, origin);

        // and after either strategy
        console.log(circleFeature.getGeometry())
        let currentZoom = map.getView().getZoom()
        console.log(currentZoom)
        /*
        if(currentZoom==defZoom){
            console.log("current")
        }else{
            featuredraw=false
        }*/
})
})
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
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