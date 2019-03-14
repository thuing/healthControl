// pages/register/register.js
Page({
  data: {
    
  },
  //点击“患者”按钮跳转页面
  onTapPatient() {
    wx.navigateTo({
      url: '/pages/patientinterface/patientinterface',
    })
  },
  //点击“医生”按钮跳转页面
  onTapDoctor() {
    wx.navigateTo({
      url: '/pages/doctorinterface/doctorinterface',
    })
  }


})