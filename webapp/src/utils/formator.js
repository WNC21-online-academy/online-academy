export const toCurrency = str => new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
}).format(str)

export const toDatetime = str => str ? new Intl.DateTimeFormat('vi-VN', {
  year: 'numeric', month: 'numeric', day: 'numeric',
  hour: 'numeric', minute: 'numeric',
  hour12: false,
  timeZone: 'Asia/Ho_Chi_Minh'
}).format(new Date(str)) : ''