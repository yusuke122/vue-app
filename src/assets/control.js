
OpenLayers（OL）で Vue 3 を使って、以下のような要件の **カスタムコントロール** を作りたいということですね：

OpenLayers の `ol/control/Control` を継承してカスタムコントロールを作成Vue テンプレート内で `<div @click="test" v-if="flag">` のような構造を持たせたいその Vue 的なコンポーネントを OL のコントロールとして `map.addControl()` で追加したい
これはつまり「**Vue のリアクティブなコンポーネント（または HTML 要素）を OpenLayers のコントロールに埋め込む**」ということになります。以下に実現方法を説明します。

---

## 【ステップ1】Vue コンポーネント内でカスタムコントロールを定義

OpenLayers の `ol/control/Control` は HTML の DOM 要素を受け取るので、Vue の `ref` を使ってその DOM を取得し、それをラップしてコントロールに変換します。

### 例：Vue + OpenLayers カスタムコントロールの統合

#### `CustomControl.vue`（クリック可能なコントロール）

```vue
<template>
  <div v-if="flag" ref="controlEl" class="ol-unselectable ol-control">
    <div @click="test">クリックしてアクション</div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import Control from 'ol/control/Control'

// Props や状態
const flag = ref(true)

// DOM要素への参照
const controlEl = ref(null)

const props = defineProps({
  map: Object // 親から map インスタンスを渡してもらう
})

// 任意のクリック処理
function test() {
  alert('コントロールがクリックされました')
}

onMounted(() => {
  if (!props.map || !controlEl.value) return

  // OpenLayers の Control に DOM を渡す
  const customControl = new Control({
    element: controlEl.value
  })

  props.map.addControl(customControl)
})
</script>

<style scoped>
.ol-control {
  background: white;
  padding: 4px;
  border: 1px solid #ccc;
  cursor: pointer;
}
</style>
```

---

## 【ステップ2】親コンポーネントから `map` を渡す

```vue
<template>
  <div ref="mapContainer" class="map" />
  <CustomControl :map="map" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import CustomControl from './CustomControl.vue'

const map = ref(null)
const mapContainer = ref(null)

onMounted(() => {
  map.value = new Map({
    target: mapContainer.value,
    layers: [
      new TileLayer({
        source: new OSM()
      })
    ],
    view: new View({
      center: [0, 0],
      zoom: 2
    })
  })
})
</script>

<style>
.map {
  width: 100%;
  height: 400px;
}
</style>
```

---

## 補足

`ref="controlEl"` を使って Vue のテンプレート DOM を取得それを OL の `Control` に渡すことで DOM ベースのカスタムコントロールを作れる`v-if` など Vue の構文も使える（ただし、`v-if` によって DOM が消えるとエラーになるので注意）
---

## まとめ

**Vue コンポーネントの DOM を使って OpenLayers にカスタムコントロールを追加するには、Vue の `ref` 経由で要素を取得し、`ol/control/Control` に渡して `map.addControl()` するのが正解です。**
さらに Vue コンポーネントとして再利用可能にしたい場合や、複数制御を統合したい場合はコンポーネントの分離設計が有効です。

この構成で動作させる際に何か詰まった点はありますか？


