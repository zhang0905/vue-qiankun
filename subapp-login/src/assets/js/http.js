import Vue from 'vue'
import axios from 'axios'

let axiosInstance = axios.create();
Vue.prototype.$http = axiosInstance;

/**
 * 自定义配置
 * @type {Object|*}
 */
axiosInstance.defaults.timeout = 20000;
axiosInstance.defaults.headers.post['content-type'] =
  'application/json;charset=utf-8';
// Add a request interceptor请求拦截
axiosInstance.interceptors.request.use(
  function (config) {
    config.headers.authorization = window.sessionStorage.getItem('token');
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// window.localStorage.setItem('HOST', axiosInstance.defaults.baseURL);
// Add a response interceptor请求响应拦截
axiosInstance.interceptors.response.use(
  function (response) {
    // let code = response.data && response.data.errorCode;
    return response.data;
    // if (code === 200) {
    //   return Promise.reject(response.data);
    // } else if (code === 11 && response.data.error === '用户未登陆或登录已超时') {
    //   // window.top.location.href = window.localStorage.getItem('HOST');
    // } else {
    //   return response.data;
    // }
  },
  function (error) {
    console.log(error);
  }
);

