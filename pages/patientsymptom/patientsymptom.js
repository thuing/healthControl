const date = new Date()
const years = []
const months = []
const days = []

for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}

Page({
  data: {
    items: [
      { name: '✔︎', value: '✔︎' },
      { name: '✘', value: '✘' }
    ],
  },
  //日期绑定事件
  bindDate1Change: function (e) {
    this.setData({
      dates1: e.detail.value
    })
  },
  bindDate2Change: function (e) {
    this.setData({
      dates2: e.detail.value
    })
  },
  //提交按钮绑定事件
  formSubmit: function (e) {
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 1000
    });
    console.log(e.detail.value)
  }
})
