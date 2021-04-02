import axios from 'axios'
import packet from '@/utils/packet'
import { Toast } from 'vant'
import { BASE_URL, BASE_URL_DRIVER } from '@/common/constants'
import store from '@/store'
import { CLEAR_USER_IFNO } from '@/store/mutation-types'
const service = axios.create({
  timeout: 20000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json,text/plain,*/*; charset=utf-8',
  },
})
// 免登接口
let whiteListApi = ['passenger/safe/order/selectMapInfo', 'passenger/safe/order/selectDetail']

// 请求拦截
service.interceptors.request.use(
  config => {
    const userInfo = store.getters['user/userInfo']
    let token = null
    let sslUrl = null
    if (userInfo) {
      // 免登接口不传token
      token = whiteListApi.includes(config.url) ? null : userInfo.token
      sslUrl = userInfo.sslUrl
    }
    // console.log(config.baseURL, 'serviceType')
    if (sslUrl) {
      config.baseURL = sslUrl
    } else if (!config.baseURL) {
      config.baseURL = BASE_URL
    }
    // 空数据不传
    if (config.data) {
      let paramsKey = Object.keys(config.data)
      if (paramsKey.length == 0) {
        config.data = { ...packet, token }
      } else {
        config.data = { ...packet, data: JSON.stringify(config.data), token }
      }
    } else {
      config.data = { ...packet, token }
    }
    console.log('请求参数', config.data)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(
  response => {
    if (!response.data) {
      Toast({ message: '系统繁忙,请稍后再试', forbidClick: true })
      return
    }
    const res = response.data
    if (res.code !== 1) {
      // Toast({ message: res.msg || '系统繁忙', forbidClick: true })
      if (res.code == -13) {
        store.commit('user/' + CLEAR_USER_IFNO, null)
      }
      return Promise.reject(res)
    } else {
      try {
        console.log('响应结果', JSON.parse(res.data))
        return JSON.parse(res.data)
      } catch (e) {
        // openid 返回字符串
        return res.data
      }
    }
  },
  error => {
    console.log('err', error) // for debug
    if (error instanceof Error) {
      Toast({ message: '系统繁忙 请稍后再试', forbidClick: true })
    }
    return Promise.reject(error)
  }
)
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export const get = ({ url, ...config }) => {
  setDriverURL(config)
  return service.get(url, config)
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {String} [type = passenger] [请求的baseUrl类型, 默认为乘客服务]
 */
export const post = ({ url, params = {}, ...config }) => {
  setDriverURL(config)
  return service.post(url, params, config)
}

function setDriverURL(config) {
  if (config.serviceType == 'driver') {
    config.baseURL = BASE_URL_DRIVER
    delete config.serviceType
  }
}
