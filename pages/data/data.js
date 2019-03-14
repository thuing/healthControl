// pages/data/data.js
Page({
  data: {
    inputShowed: false,
    inputVal: ""
  },
  //搜索框绑定事件
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  //折线分析图按钮跳转
  onTapAnalyze1() {
    wx.navigateTo({
      url: '/pages/analyze1/analyze1',
    })
  },
  onTapAnalyze2() {
    wx.navigateTo({
      url: '/pages/analyze2/analyze2',
    })
  },
  onTapAnalyze3() {
    wx.navigateTo({
      url: '/pages/analyze3/analyze3',
    })
  },
  onTapAnalyze4() {
    wx.navigateTo({
      url: '/pages/analyze4/analyze4',
    })
  },
  onTapAnalyze5() {
    wx.navigateTo({
      url: '/pages/analyze5/analyze5',
    })
  }
})
