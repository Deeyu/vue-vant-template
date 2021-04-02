import api from './api'
import { post } from '@/utils/request'
// 获取城市配置
export const getCityConiguration = (areaCode = 0) => {
  return post({
    url: api.cityConiguration,
    params: { areaCode },
  })
}
