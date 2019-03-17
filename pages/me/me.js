// pages/me/me.js
var app = getApp()

Page({
  onTapLogin() {
    if (app.globalData.userIdentity == "patient"){
      wx.navigateTo({
        url: '/pages/patientinterface/patientinterface',
      })
    }else if (app.globalData.userIdentity == "doctor") {
      wx.navigateTo({
        url: '/pages/patientinterface/patientinterface',
      })
    }else{
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  }
})