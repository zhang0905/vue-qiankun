import Vue from "vue";
import App from "./App.vue";
import VueRouter from 'vue-router';
import store from "./store";
import selfRoutes from "./router";
import "./public-path";

/**
 * @name 导入自定义路由匹配方法
 */
import routeMatch from "./router/routes-match";

/**
 * @name 导入官方通信方法
 */
 import appStore from "./assets/js/utils/app-store";

const __qiankun__ = window.__POWERED_BY_QIANKUN__;
let router = null;
let instance = null;

function render({ routes, routerBase }) {
  Vue.config.productionTip = false;
  router = new VueRouter({
    mode: 'history',
    base: __qiankun__ ? routerBase : "/",
    routes: __qiankun__ ? routeMatch(routes, routerBase) : selfRoutes
  });
  instance = new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app');
}

__qiankun__ || render({});

export async function bootstrap() {
  console.log('vue app bootstraped');
}

export async function mount(props) {
  console.log('props from main framework', props);
  // 注册应用间通信
  appStore(props);
  // 注册微应用实例化函数
  render(props);
}

export async function unmount() {
  instance.$destroy();
  instance = null;
  router = null;
}