import Vue from 'vue'
import SvgIcon from '@/base/SvgIcon' // svg component

// register globally
Vue.component('svg-icon', SvgIcon)
/**  https://juejin.im/post/59bb864b5188257e7a427c09
 *  自动导入
 *  require.context有三个参数：
 *  directory：说明需要检索的目录
 *  useSubdirectories：是否检索子目录
 *  regExp: 匹配文件的正则表达式
 *
 */
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
