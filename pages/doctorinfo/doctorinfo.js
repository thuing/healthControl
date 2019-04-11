// pages/doctorinfo/doctorinfo.js
Page({
  data: {
    items: [
      { name: '男', value: '男' },
      { name: '女', value: '女' }
    ]
  },
  //提交按钮绑定事件
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
  //“获取验证码”按钮绑定事件
  checkSubmit: function () {
    wx.showToast({
      title: '验证码已发送',
      icon: 'success',
      duration: 1000
    })
  }
})