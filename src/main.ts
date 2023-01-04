import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import axios from "axios";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'
import i18n from './plugins/i18n'
import language from './lang/data';

import './assets/main.css'

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost';

const app = createApp(App)
app.use(router)

const pinia = createPinia();
pinia.use(({ store }) => {
    store.router = markRaw(router)
});

app.use(pinia)
app.use(i18n, language)
app.use(ElementPlus)

app.mount('#app')
