import * as types from './mutation-types'
import { getCityConiguration } from '@/services'
import { wsSelectAllCity } from '@/services/address'
/**
 *
 * @param commit
 * @param params
 * @returns {Promise<any>}*
 * Action 通过 store.dispatch 方法触发，执行异步操作。例如：this.$store.dispatch('getCompanyInfo')
 * 组合Action使用：this.$store.dispatch('getCompanyInfo').then((response)=>{...})
 * 在组件中分发多个Action使用 mapActions 辅助函数
 */

// 获取城市基础配置
export const getCityConfig = ({ commit }, params) => {
  getCityConiguration(params)
    .then(({ businessVos = [], ...baseConfig } = {}) => {
      if (businessVos.length) {
        commit(types.SET_CITYBUSINESSVOS, businessVos)
      }
      if (baseConfig && baseConfig.commonConfigs) {
        commit(types.SET_BASECONFIG, baseConfig)
      }
    })
    .catch(res => {
      console.log(res)
    })
}

// 获取全国城市列表
export const getCityList = ({ commit, state }) => {
  if (state.cityList.length === 0) {
    wsSelectAllCity()
      .then(result => {
        if (result && result.length) {
          commit(types.GET_CITYLIST, result)
        }
      })
      .catch(res => {
        console.log(res)
      })
  }
}
