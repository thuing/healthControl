// pages/doctorinterface/doctorinterface.js
var app = getApp();
Page({
  onLoad: function () {
    //加载本页面的tabBar样式
    app.editTabBar();
  },
  data: {
    menuitems: [
      { text: '医生个人信息填写', url: '/pages/doctorinfo/doctorinfo', icon: '/images/个人信息.png', tips: '' }
    ]
  },
})
