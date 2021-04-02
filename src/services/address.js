import api from './api'
import { post } from '@/utils/request'
// 查询全国城市
export const wsSelectAllCity = () => {
  return post({
    url: api.selectAllCity,
  })
}
