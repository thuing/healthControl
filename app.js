//app.js
var api_url = require("./api/api.js"); //引入api.js

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    //调用API从本地缓存中获取数据
    var jwt = wx.getStorageSync('jwt');
    var that = this;
    if (!jwt) {//检查 jwt 是否存在 如果不存在调用登录
    } else {
      this.globalData.jwt = jwt
    }
  },

  login: function(e) {
    var userinfo = e
    // 登录部分代码
    var that = this;
    // 登录
    wx.login({
        success: function (res) {
          var code = res.code;
          try {
            that.globalData.userInfo = userinfo.detail.userInfo;
            var encryptedData = userinfo.detail.encryptedData || 'encry';
            var iv = userinfo.detail.iv || 'iv';
          } catch (e) {
            return false
          }
          console.log(api_url.basic_token);
          wx.request({ // 发送请求 获取 jwt
            url: api_url.login,
            header: {
              Authorization: 'JWT' + that.globalData.access_token,
            },
            data: {
              username: encryptedData,
              password: iv,
              code: code,
            },
            method: "POST",
            success: function (res) {
              if (res.statusCode === 200) {
                // 得到 jwt 后存储到 storage，
                wx.showToast({
                  title: '登录成功',
                  icon: 'success'
                });
                wx.setStorage({
                  key: "jwt",
                  data: res.data.token
                });
                that.globalData = res.data
                that.globalData.jwt = res.data.token
                that.globalData.access_token = res.data.token;
                that.globalData.account_id = res.data.sub;
                if (app.globalData.userIdentity == "patient") {
                  wx.redirectTo({
                    url: '/pages/patient/patient',
                  })
                } else {
                  wx.redirectTo({
                    url: '/pages/doctor/doctor',
                  })
                }
              } else if (res.statusCode === 400) {
                // 如果没有注册调用注册接口
                console.log("register")
                that.register(userinfo);
              } else {
                // 提示错误信息
                wx.showToast({
                  title: res.data.text,
                  icon: 'success',
                  duration: 2000
                });
              }
            },
            fail: function (res) { }
          })
        }
      })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  
  register: function (e) {
    // 注册代码
    var that = this;
    var userinfo = e
    wx.login({ // 调用登录接口获取 code
      success: function (res) {
        var code = res.code;
        try {
          that.globalData.userInfo = userinfo.detail.userInfo;
          var encryptedData = userinfo.detail.encryptedData || 'encry';
          var iv = userinfo.detail.iv || 'iv';
        } catch (e) {
          return false
        }
        wx.request({ // 请求注册用户接口
          url: api_url.Registered,
          header: {
            //Authorization: config.basic_token
          },
          data: {
            username: encryptedData,
            password: iv,
            code: code,
            userIdentity: app.globalData.userIdentity,
          },
          method: "POST",
          success: function (res) {
            if (res.statusCode == 201) {
              that.login(userinfo);
              if (app.globalData.userIdentity == "patient") {
                wx.redirectTo({
                  url: '/pages/patient/patient',
                })
              } else {
                wx.redirectTo({
                  url: '/pages/doctor/doctor',
                })
              }
            }
            if (res.statusCode == 401) {
              that.register(userinfo);
            }
          },
          fail: function (res) { }
        })

      }
    })

  },

  globalData: {
    userInfo: null,
    userIdentity: "null",
    jwt: null,
  },

  //第一种底部  
  editTabBar: function () {
    //使用getCurrentPages可以获取当前加载中所有的页面对象的一个数组，数组最后一个就是当前页面。
    var curPageArr = getCurrentPages();    //获取加载的页面
    var curPage = curPageArr[curPageArr.length - 1];    //获取当前页面的对象
    var pagePath = curPage.route;    //当前页面url
    if (pagePath.indexOf('/') != 0) {
      pagePath = '/' + pagePath;
    }

    var tabBar = this.globalData.tabBar;
    for (var i = 0; i < tabBar.list.length; i++) {
      tabBar.list[i].active = false;
      if (tabBar.list[i].pagePath == pagePath) {
        tabBar.list[i].active = true;    //根据页面地址设置当前页面状态    
      }
    }
    curPage.setData({
      tabBar: tabBar
    });
  },
  
  //第二种底部，原理同上
  editTabBar1: function () {
    var curPageArr = getCurrentPages();
    var curPage = curPageArr[curPageArr.length - 1];
    var pagePath = curPage.route;
    if (pagePath.indexOf('/') != 0) {
      pagePath = '/' + pagePath;
    }
    var tabBar = this.globalData.tabBar1;
    for (var i = 0; i < tabBar.list.length; i++) {
      tabBar.list[i].active = false;
      if (tabBar.list[i].pagePath == pagePath) {
        tabBar.list[i].active = true;
      }
    }
    curPage.setData({
      tabBar: tabBar
    });
  },

  globalData: {
    //第一种底部导航栏显示
    tabBar: {
          "color": "#FFFFFF",
          "selectedColor": "#1296db",
          "backgroundColor": "#40E0D0",
          "list": [
            {
              "pagePath": "/pages/patient/patient",
              "text": "首页",
              "iconPath": "/images/患者填写.png",
              "selectedIconPath": "/images/患者.png",
              "clas": "menu-item",
              active: true
            },
            {
              "pagePath": "/pages/patientinterface/patientinterface",
              "text": "我的",
              "iconPath": "/images/我的.png",
              "selectedIconPath": "/images/我.png",
              "clas": "menu-item",
              active: false
            }
            ],
      "position": "bottom"
    },

    //第二种底部导航栏显示
    tabBar1: {
      "color": "#FFFFFF",
      "selectedColor": "#1296db",
      "backgroundColor": "#40E0D0",
      "list": [
        {
          "pagePath": "/pages/doctor/doctor",
          "text": "首页",
          "iconPath": "/images/医生查询.png",
          "selectedIconPath": "/images/医生.png",
          "clas": "menu-item1",
          active: true
        },
        {
          "pagePath": "/pages/doctorinterface/doctorinterface",
          "text": "我的",
          "iconPath": "/images/我的.png",
          "selectedIconPath": "/images/我.png",
          "clas": "menu-item1",
          active: false
        }
      ],
      "position": "bottom"
    }
  }


})

