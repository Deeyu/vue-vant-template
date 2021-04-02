import * as types from './mutation-types'
const mutations = {
  [types.SET_LOCATION](state, parm) {
    //定位信息
    state.location = parm
  },
  [types.SET_CITYBUSINESSVOS](state, parm) {
    //城市业务配置信息
    state.cityBusinessVos = parm
  },
  [types.SET_CURRENTBUSINESS](state, parm) {
    //用户当前选择的业务类型
    state.currentBusiness = parm
  },
  [types.SET_BASECONFIG](state, parm) {
    //用户当前城市的基础配置
    state.cityBaseConfig = parm
  },
  [types.SET_STARTPOINT](state, parm) {
    //设置用户选择的起点
    state.userStartPoint = parm
  },
  [types.SET_ENDPOINT](state, parm) {
    //保存终点信息
    state.userEndPoint = parm
  },
  [types.GET_CITYLIST](state, parm) {
    //获取城市列表
    state.cityList = parm
  },
  [types.SET_APPAREACODE](state, parm) {
    //获取城市列表
    state.appAreaCode = parm
  },
}
export default mutations
