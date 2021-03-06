Page({
  data: {
    items: [
      { name: '男', value: '男' },
      { name: '女', value: '女'}
    ]
  },
  //日期选择绑定事件
  bindDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      dates: e.detail.value
    })
  },
  // 提交按钮绑定事件
  formSubmit: function (e) {
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 1000,
      success: function () {
        setTimeout(function () {
          wx.navigateBack({
            delta: 2
          })
        }, 1000)// 延时时间
      }
    });
    console.log(e.detail.value)

  },
  //验证码按钮绑定事件
  checkSubmit: function () {
    wx.showToast({
      title: '验证码已发送',
      icon: 'success',
      duration: 1000
    })
  }

})