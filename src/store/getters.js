import { locationConvert } from '@/utils/tool'
// 定位区域编码,优先取app的areaCode
export const locationAdcode = state =>
  state.appAreaCode || (state.location && state.location.adcode && state.location.adcode) || 0 // 定位城市

// 客服电话
export const contactPhone = state => (state.user.userInfo && state.user.userInfo.contactPhone) || '4006424888'

// 登录凭证
export const token = state => (state.user.userInfo && state.user.userInfo.token) || null

// 用户id
export const userId = state => (state.user.userInfo && state.user.userInfo.userId) || null

// 用户信息
export const userInfo = state => (state.user && state.user.userInfo) || {}

// H5已开放的城市业务
export const openCityBusinessVos = ({ H5baseConfig, cityBusinessVos }) =>
  cityBusinessVos.filter(item => H5baseConfig.includes(+item.businessCode))

// 业务下面的场景信息列表 实时/预约
export const currentBusinessOptionVos = ({ currentBusiness }) =>
  currentBusiness.OptionVos.filter(({ optionCode }) => optionCode % 100 < 30) || []

//乘客选择的起点位置
export const startPoint = state => {
  let startPoint = state.userStartPoint || state.location || {}
  return locationConvert(startPoint)
}
//乘客选择的终点位置
export const endPoint = state => {
  let endPoint = state.userEndPoint || {}
  return locationConvert(endPoint)
}

// 乘客城市编码
export const cityCode = (
  state, // eslint-disable-line
  getters
) => getters.startPoint && getters.startPoint.adcode && getters.startPoint.adcode.slice(0, 4) + '00'

export const getDistanceFromOrderStartLocation = ({ cityBaseConfig: { commonConfigs = [] } }) => type => {
  let { distanceFromOrderStartLocation } = commonConfigs.find(({ businessType }) => businessType == +type) || {
    distanceFromOrderStartLocation: 1000,
  }
  return distanceFromOrderStartLocation
}

// 运行中的订单
export const runOrder = state => {
  return state.order.runOrder
}
