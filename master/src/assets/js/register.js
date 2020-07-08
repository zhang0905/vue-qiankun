import { registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start, initGlobalState } from "qiankun";
import store from "../../store";
import appStore from "./utils/app-store";

const appContainer = "#subapp-viewport";
let props = {
    data: store.getters
}
// 已经登录之后的微应用
const authApps = [
    {
        id: "1",
        title: "权限管理",
        icon: "el-icon-monitor",
        module: "subapp-ui",
        defaultRegister: true,
        devEntry: "//localhost:8082",
        depEntry: "http://ui.mfe.wlui.com.cn/",
        routerBase: "/ui",
        data: [
            {
                id: "1-1",
                title: "home",
                url: "/ui"
            },
            {
                id: "1-2",
                title: "about",
                url: "/ui/about"
            }
        ]
    },
    {
        id: "2",
        title: "角色管理",
        icon: "el-icon-date",
        module: "subapp-blog",
        defaultRegister: false,
        devEntry: "//localhost:8083",
        depEntry: "http://blog.mfe.wlui.com.cn",
        routerBase: "/blog",
        data: [
            {
                id: "2-1",
                title: "思否",
                url: "/blog"
            },
            {
                id: "2-2",
                title: "掘金",
                url: "/blog/juejin"
            }
        ]
    }
]
// 未登录的登录页面
const noAuthApps = [
    {
        module: "subapp-login",
        defaultRegister: true,
        devEntry: "//localhost:8081",
        depEntry: "http://login.mfe.wlui.com.cn/",
        routerBase: "/login",
        data: [
          {
            id: "1",
            title: "login",
            icon: "el-icon-monitor",
            children: [
              {
                id: "1-1",
                title: "home",
                url: "/login"
              }
            ]
          }
        ]
      }
]

const qianKunStart = (list) => {
    let apps = []; // 子应用数组盒子
    let defaultApp = null; // 默认注册应用路由前缀
    let isDev = process.env.NODE_ENV === 'development'; // 根据开发环境|线上环境加载不同entry
    list.forEach(i => {
        apps.push({
        name: i.module,
        entry: isDev ? i.devEntry : i.depEntry,
        container: appContainer,
        activeRule: i.routerBase,
        props: { ...props, routes: i.data, routerBase: i.routerBase }
        })
        if (i.defaultRegister) defaultApp = i.routerBase;
    });
    //  注册子应用
    registerMicroApps(
        apps,
        {
            beforeLoad: [
                app => {
                    console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
                },
            ],
            beforeMount: [
                app => {
                    console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
                },
            ],
            afterUnmount: [
                app => {
                    console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
                },
            ],
        },
    )
    
    /**
       * @name 设置默认进入的子应用
       * @param {String} 需要进入的子应用路由前缀
       */
      console.log(defaultApp);
      setDefaultMountApp(defaultApp + '/');
    
      /**
       * @name 启动微前端
       */
      start();
    
      /**
       * @name 微前端启动进入第一个子应用后回调函数
       */
      runAfterFirstMounted(() => { });
    
      /**
     * @name 启动qiankun应用间通信机制
     */
      appStore(initGlobalState);    
}
/**
 * @name 验证用户身份并注册微应用
 */
const microAppStart = () => {
    const token = window.sessionStorage.getItem("token");
    /**
     * @name 已登录状态获取服务端微应用注册表
     */
    if (token) {
      // 处理token状态共享
      store.dispatch('app/setToken', token);
      qianKunStart(authApps);
      return;
    }
    /**
     * @name 默认加载未登录时无需服务端获取的微应用
     */
    qianKunStart(noAuthApps);
}
export default microAppStart;


