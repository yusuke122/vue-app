# vue-map-app

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
はい、**GeoJSONを使って描画したフィーチャーでも、押下（クリック）した場所に存在する複数のフィーチャーを判定し、情報をポップアップ表示することは可能**です。

OpenLayersでは、`map.forEachFeatureAtPixel(...)` を使うことで、**クリック地点のピクセルにあるすべてのフィーチャー（同じ座標でも異なる属性・レイヤ）を取得**できます。

---

## **構成ポイント**

* GeoJSONで作成されたフィーチャーも他と同じように扱える（`ol.Feature` に変換されている）
* 同じ位置に複数のフィーチャーがある場合も、すべて検出可能
* 属性情報（例：`feature.getProperties()`）を表示に利用できる
* 任意のレイヤを対象にできる（フィルタも可能）

---

## **実装例：クリック位置のフィーチャーを取得してポップアップ表示**

```js
map.on('singleclick', function (evt) {
  const featuresAtPixel = [];
  
  map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
    featuresAtPixel.push({ feature, layer });
  });

  if (featuresAtPixel.length > 0) {
    let html = `<strong>重なっているフィーチャー (${featuresAtPixel.length})</strong><ul>`;
    featuresAtPixel.forEach(({ feature }, index) => {
      const props = feature.getProperties();
      delete props.geometry; // 不要なジオメトリ情報は除外
      html += `<li>Feature ${index + 1}: ${JSON.stringify(props)}</li>`;
    });
    html += `</ul>`;

    showPopup(evt.coordinate, html);
  }
});
```

---

### **ポップアップ表示の関数（例）**

```js
const popupElement = document.getElementById('popup');

const overlay = new ol.Overlay({
  element: popupElement,
  positioning: 'bottom-center',
  stopEvent: false,
  offset: [0, -15]
});
map.addOverlay(overlay);

function showPopup(coord, html) {
  popupElement.innerHTML = html;
  overlay.setPosition(coord);
}
```

### **HTML側のポップアップ要素（例）**

```html
<div id="popup" style="
  background: white;
  padding: 10px;
  border: 1px solid black;
  border-radius: 4px;
  min-width: 200px;
  position: absolute;
  z-index: 100;
"></div>
```

---

## **補足ポイント**

* `forEachFeatureAtPixel` は「レンダリング上に見えているフィーチャー」に反応します（非表示やスタイル `null` のものは反応しない）。
* 同一座標上に**属性の異なる複数フィーチャー**も全て取得できます。
* 特定レイヤだけ対象にしたい場合は、第3引数に `layerFilter` を追加可能：

```js
map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
  ...
}, {
  layerFilter: l => l.get('id') === 'layerA'
});
```

---

## **まとめ**

| 要件                      | 対応方法                                        |
| ----------------------- | ------------------------------------------- |
| GeoJSONから描画したフィーチャーも使える | `readFeatures()` 経由で `ol.Feature` になっていればOK |
| 押下位置の複数フィーチャー取得         | `map.forEachFeatureAtPixel(...)`            |
| ポップアップ表示                | `ol.Overlay` + `setPosition()` + HTML       |
| 属性抽出                    | `feature.getProperties()` でJSON風に扱える        |

---

### ご希望があれば：

* **複数レイヤを対象にしたフィルター処理**
* **GeoJSON属性の特定項目だけを表示（整形）**
* **クリック以外のイベント（長押し、右クリックなど）対応**

…といった細かな対応も可能です！サンプルデータがあればより具体化もできますので、遠慮なくお知らせください。


