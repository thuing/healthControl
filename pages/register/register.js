// pages/register/register.js
const app = getApp()

Page({
  data: {
  },

  //点击“患者”按钮跳转页面

  onTapPatient:function (e) {
    app.globalData.userIdentity = "patient"
    console.log("身份是:  " + app.globalData.userIdentity)
    app.login(e);
  },

  //点击“医生”按钮跳转页面
  onTapDoctor:function (e)  {
    app.globalData.userIdentity = "doctor"
    console.log("身份是" + app.globalData.userIdentity) 
    app.login(e);
  },

  onUnload: function () {
    console.log('App onHide');
  },

})