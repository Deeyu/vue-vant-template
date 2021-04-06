//格式化处理字符串
//ecDo.formatText('1234asda567asd890')
//result："12,34a,sda,567,asd,890"
//ecDo.formatText('1234asda567asd890',4,' ')
//result："1 234a sda5 67as d890"
//ecDo.formatText('1234asda567asd890',4,'-')
//result："1-234a-sda5-67as-d890"
export function formatText(str, size, delimiter) {
  var _size = size || 3,
    _delimiter = delimiter || ','
  var regText = '\\B(?=(\\w{' + _size + '})+(?!\\w))'
  var reg = new RegExp(regText, 'g')
  return str.replace(reg, _delimiter)
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}
/**
 * @description 过滤手机号
 * 13333333333 => "133****3333"
 * @param {number} phone
 */
export function hidePhone(phone = '') {
  return phone.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')
}

/**
 * @description 格式化手机号
 * 13344443333 => "133 4444 3333"
 * @param {number} phone
 */
export function formaPhone(phone = '') {
  return phone.replace(/(\d{3})(\d{0,4})(\d{0,4})/, '$1 $2 $3')
}
