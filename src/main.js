import Vue from 'vue'
// 用于控制浏览器前进后退 使用keep-alive
import Navigation from 'vue-navigation'
import FastClick from 'fastclick'
import App from './App.vue'
import store from './store'
import router from './router'
import * as filters from './filters' // global filters
import './assets/icons/svg-icons' // svg icon
import './assets/style/normalize.css' //reset css
import './assets/style/global.less'
// 自定义主题不能按需加载样式 https://github.com/youzan/vant/issues/1511
import 'vant/lib/index.less'
// 安装基础组件 与自定义组件
import BaseComponent from './base'
// import CustomComponent from './components'

Vue.use(BaseComponent, {})
// Vue.use(CustomComponent, {})

Vue.config.productionTip = false

// 处理点击事件延迟300ms问题
// 修复点击300ms延迟
if ('addEventListener' in document) {
  document.addEventListener(
    'DOMContentLoaded',
    () => {
      FastClick.attach(document.body)
    },
    false
  )
}
// 解决因使用fastclick 导致的iOS 机型点击输入框不能聚焦，或者点击多次才能聚焦的问题
FastClick.prototype.focus = function(targetElement) {
  targetElement.focus()
}
FastClick.attach(document.body)
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
// 用于控制浏览器前进后退缓存
Vue.use(Navigation, {
  keyName: 'WSJC',
  router,
  store,
})

// 开发环境下面使用vConsole进行调试
if (process.env.NODE_ENV === 'development') {
  const VConsole = require('vconsole')
  new VConsole()
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
