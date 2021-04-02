module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },

  globals: {
    process: true,
    AMap: true,
    AMapUI: true,
    Paho: true,
    Toast: true,
    AMapLoader: true,
    WeixinJSBridge: true,
    wx: true,
    ws: true,
    Activity: true,
  },

  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaFeatures: {
      // 支持装饰器
      legacyDecorators: true,
    },
  },

  extends: ['plugin:vue/recommended', '@vue/prettier'],
  plugins: ['vue', 'prettier'],

  rules: {
    // // 自定义 prettier 规则 (实际上，可配置项非常有限)
    'no-console': 0,
    'no-debugger': 0,
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'prettier/prettier': 'error',
    'generator-star-spacing': 'off',
    // 'space-before-function-paren': 'off',
    'space-before-function-paren': 0,
    'no-unused-vars': [0, { vars: 'local', args: 'none', ignoreRestSiblings: false }],
    // 'space-before-function-paren': ['error', 'always'],
  },
}
