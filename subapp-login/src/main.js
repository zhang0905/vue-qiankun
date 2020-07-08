import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import routes from "./router";
import ElementUI from "element-ui";
import store from './store';
import "./assets/js/http";
import "./mock/index";
import "./public-path";

//引入样式组件
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/install';

Vue.use(ElementUI);

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount("#app");

let router = null;
let instance = null;

function render() {
  Vue.config.productionTip = false;
  router = new VueRouter({
    mode: 'history',
    // base: window.__POWERED_BY_QIANKUN__,
    routes
  });
  instance = new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app');
}
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log('vue app bootstraped');
}

export async function mount(props) {
  console.log('vue app mount', props);
  render();
}

export async function unmount() {
  instance.$destroy();
  instance = null;
  router = null;
}
