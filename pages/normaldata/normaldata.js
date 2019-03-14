// pages/normaldata/normaldata.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
        inputShowed: false,
        inputVal: ""
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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
