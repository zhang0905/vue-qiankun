import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import store from './store';
import "./assets/js/http";
import "./mock/index";

//引入样式组件
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/install';

Vue.use(ElementUI);

//引入qiankun注册的子应用
import microAppStart from './assets/js/register';

// 实例化vue
function vueRender() {
  Vue.config.productionTip = false;
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app");
  return;
}
vueRender({});

microAppStart();


