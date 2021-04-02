// vuex数据持久化 https://juejin.im/post/5b62999fe51d4519610e336e
// import createPersistedState from 'vuex-persistedstate'
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'
Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

export default new Vuex.Store({
  modules,
  state,
  mutations,
  actions,
  getters,
  // plugins: [
  //   createPersistedState({
  //     storage: window.sessionStorage,
  //       reducer(val) {
  //           return {
  //             // 只储存state中的user
  //             user: val.userStore
  //         }
  //      }
  //   }),
  // ],
})
