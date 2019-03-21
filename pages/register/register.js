// pages/register/register.js
var app = getApp()
Page({
  data: {
    
  },
  //点击“患者”按钮跳转页面
  onTapPatient() {
    app.globalData.userIdentity = "patient"
    console.log("身份是:  " + app.globalData.userIdentity)
    wx.redirectTo({
      url: '/pages/patient/patient',
    })
  },
  //点击“医生”按钮跳转页面
  onTapDoctor() {
    app.globalData.userIdentity = "doctor"
    console.log("身份是" + app.globalData.userIdentity)
    wx.redirectTo({
      url: '/pages/doctor/doctor',
    })
  },

  onUnload: function () {
    console.log('App onHide');

  },


})