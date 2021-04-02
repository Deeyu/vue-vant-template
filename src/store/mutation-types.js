//使用常量替代 mutation 事件类型,可以对整个 app 包含的 mutation 一目了然,有利于多人合作项目
export const SET_USER_IFNO = 'SET_USER_IFNO' // 获取登录用户信息
export const CLEAR_USER_IFNO = 'CLEAR_USER_IFNO' // 清除登录用户信息

export const SET_CURRENTBUSINESS = 'SET_CURRENTBUSINESS' // 用户当前选择的业务类型

export const SET_LOCATION = 'SET_LOCATION' // 设置定位信息

export const SET_STARTPOINT = 'SET_STARTPOINT' // 设置起点信息

export const SET_ENDPOINT = 'SET_ENDPOINT' // 设置终点信息

export const SET_CITYBUSINESSVOS = 'SET_CITYBUSINESSVOS' // 设置城市业务配置信息

export const SET_BASECONFIG = 'SET_BASECONFIG' // 设置城市基础配置信息

export const GET_CITYLIST = 'GET_CITYLIST' // 获取全国城市列表

export const SET_APPAREACODE = 'SET_APPAREACODE' // 从app获取的areaCode
/* order */
export const SET_RUNNINGORDER = 'SET_RUNNINGORDER' // 运行中的订单

// export const SET_ORDERDETAIL = 'SET_ORDERDETAIL' // 订单详情
