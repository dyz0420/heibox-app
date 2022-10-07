import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App.vue';
import 'ant-design-vue/dist/antd.css';
import {router} from './router'
import {store} from './store'
import './assets/iconfont/iconfont.css'

const app = createApp(App);
app.use(Antd).use(router).use(store).mount('#app');