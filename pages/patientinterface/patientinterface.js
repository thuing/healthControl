// pages/patientinterface/patientinterface.js

var app = getApp();

Page({

  onLoad: function () {
    //加载本页面的tabBar样式
    app.editTabBar();
  },

  data: {
    menuitems: [
      { text: '患者个人信息填写', url: '/pages/patientinfo/patientinfo', icon: '/images/个人信息.png', tips: '' },
      { text: '患者就诊信息填写', url: '/pages/treatment/treatment', icon: '/images/患者就诊信息.png', tips: '' },
      { text: '患者初诊血常规填写', url: '/pages/first/first', icon: '/images/患者血常规.png', tips: '' }
    ]
  },
})
