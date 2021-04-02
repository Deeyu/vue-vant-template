const state = {
  H5baseConfig: [200, 300, 400, 600], // H5已开通业务
  location: {}, // 定位信息
  cityBaseConfig: {}, // 城市基础配置
  cityBusinessVos: [
    // 当前城市业务配置信息
    {
      businessCode: '200',
      businessName: '快车',
      OptionVos: [
        {
          isActive: true,
          optionCode: '20010',
          optionName: '实时',
        },
      ],
    },
  ],
  currentBusiness: {
    // 用户当前选中的业务
    businessCode: '200',
    businessName: '快车',
    OptionVos: [
      {
        optionCode: '20010',
        optionName: '实时',
      },
    ],
  },
  userStartPoint: null, // 起点信息
  userEndPoint: null, // 终点信息
  cityList: [], // 城市列表
  appAreaCode: 0, // 从app获取的areaCode
}

export default state
