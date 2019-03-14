//index.js
Page({
  data: {
    //滑动视图图片
    imgUrls: [
      '/images/医院1.png',
      '/images/医院2.png',
      '/images/医院3.png'
    ],
    //滑动视图参数设置
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 500,
    circular:true
  },
  //患者血常规变化按钮页面跳转
  onTapBtn1() {
    wx.navigateTo({
      url: '/pages/patientdata/patientdata',
    })
  },
  //患者治疗后症状按钮页面跳转
  onTapBtn2() {

    var url = "https://api.douban.com/v2/movie/in_theaters";
    wx.request({
      url: url,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'Content-Type': 'application/json'//返回json格式，必须要加
      }, // 设置请求的 header
      success: function (res) {
        console.log(res.data.subjects);
        that.setData({
          movies: res.data.subjects
        });
      }
    })
    
    wx.navigateTo({
      url: '/pages/patientsymptom/patientsymptom',
    })

  },

  //血常规变化图表页面跳转
  onTapBtn3() {
    wx.navigateTo({
      url: '/pages/normaldata/normaldata',
    })
  },

  //症状变化图表页面跳转
  onTapBtn4() {
    wx.navigateTo({
      url: '/pages/symptomdata/symptomdata',
    })
  },


})