// 首先引入Mock
const Mock = require('mockjs');
import appData from './userInfo2.json';

// 设置拦截ajax请求的相应时间
Mock.setup({
  timeout: '200-600'
});

Mock.mock("/userInfo2", 'get', appData);
// let configArray = [];

// // 使用webpack的require.context()遍历所有mock文件
// const files = require.context('.', true, /\.js$/);
// files.keys().forEach((key) => {
//   if (key === './index.js') return;
//   configArray = configArray.concat(files(key).default);
// });
// console.log(configArray);
// // 注册所有的mock服务
// configArray.forEach((item) => {
//   for (let [path, target] of Object.entries(item)) {
//     let protocol = path.split('|');
//     Mock.mock(new RegExp('^' + protocol[1]), protocol[0], target);
//     console.log(Mock.mock(new RegExp('^' + protocol[1]), protocol[0], target));
//   }
// });
