/* 用户中心状态管理 */
import * as types from '../mutation-types'
const state = {
  userInfo: null, // 用户信息
}
const getters = {
  userInfo: state => {
    return state.userInfo
  },
}
const mutations = {
  [types.SET_USER_IFNO](state, params) {
    //登录用户信息
    state.userInfo = { ...state.userInfo, ...params }
  },
  [types.CLEAR_USER_IFNO](state) {
    state.userInfo = null
  },
}
const actions = {
  // 登录
  loginAction({ commit }, params) {
    // return loginApi(params).then(res => {
    //   commit(types.SET_USER_IFNO, res)
    // })
  },
  // 退登
  logoutAction({ commit }) {
    commit(types.CLEAR_USER_IFNO)
    // 清空运行中的订单
    commit('order/' + types.SET_RUNNINGORDER, {}, { root: true })
  },
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
