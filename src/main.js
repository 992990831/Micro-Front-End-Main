import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 导入qiankun所需方法
import {
  registerMicroApps, // 注册子应用
  runAfterFirstMounted, // 当地一个子应用装载完毕
  setDefaultMountApp, // 设置默认装载的子应用
  initGlobalState, // 微前端之间的通信
  start, // 启动
} from 'qiankun'

new Vue({
  render: h => h(App),
}).$mount('#container')

// 注册子应用
registerMicroApps([
  {
      name: 'one',
      entry: '//localhost:6661',
      container: '#micro-view',
      activeRule: '/one',
  },
  {
      name: 'two',
      entry: '//localhost:6662',
      container: '#micro-view',
      activeRule: '/two',
  },
],
{
  beforeLoad: [
      app => {
          console.log('beforeLoad');
      }
  ],
  beforeMount: [
      app => {
          console.log('beforeMount');
      }
  ],
  beforeUnmount: [
      app => {
          console.log('beforeUnmount');
      }
  ],
  afterUnmount: [
      app => {
          console.log('afterUnmount');
      }
  ]
})

setDefaultMountApp('one')

// 第一个子应用加载完毕后回调
runAfterFirstMounted(()=>{
  console.log('第一个子应用加载完毕后的回调');
})

// 启动qiankun
start()