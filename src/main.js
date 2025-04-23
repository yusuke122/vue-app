import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import jQuery from 'jquery'

// Vue Datepickerに関するimport
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const app = createApp(App)
// Vue Datepickerのコンポーネントを登録
app.component('VueDatePicker', VueDatePicker)
app.use(router)

app.mount('#app')
