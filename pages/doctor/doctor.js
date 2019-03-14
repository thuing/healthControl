// pages/doctor/doctor.js
Page({
  //患者个人信息表格页面跳转
  onTapBtn1() {
    wx.navigateTo({
      url: '/pages/info/info',
    })
  },
  //患者血常规变化表格页面跳转
  onTapBtn2() {
    wx.navigateTo({
      url: '/pages/data/data',
    })
  },
  //患者治疗后症状表格页面跳转
  onTapBtn3() {
    wx.navigateTo({
      url: '/pages/symptom/symptom',
    })
  }
})