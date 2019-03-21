// pages/treatment/treatment.js
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
    years: years,
    year: date.getFullYear(),
    months: months,
    month: 2,
    days: days,
    day: 2,
    value: [9999, 1, 1]
  },
  //日期绑定事件
  bindDateChange: function (e) {
    this.setData({
      dates: e.detail.value
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
    wx.navigateBack({
      delta: 2
    })
  }
})