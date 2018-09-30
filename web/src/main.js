import Vue from 'vue'
import App from './App.vue'
import router from './router.js';//导入路由

//ElementUI 引入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//基础组件导入
import components from '@/components/components.js';
Vue.use(components);

//通信-引入
import http from '@/tools/http.js';
Vue.use(http);

//全局变量
import global_ from '@/tools/global.js';
Vue.prototype.global = global_;

Vue.config.productionTip = false;


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
