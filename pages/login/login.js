// pages/login/login.js
const app = getApp()

Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  // onLoad: function () {
  //   var that = this;
  //   // 查看是否授权
  //   wx.getSetting({
  //     success: function (res) {
  //       if (res.authSetting['scope.userInfo']) {
  //         wx.getUserInfo({
  //           success: function (res) {
  //             //从数据库获取用户信息
  //             that.queryUsreInfo();
  //             //用户已经授权过
  //             wx.navigateTo({
  //               url: ''
  //             })
  //           }
  //         });
  //       }
  //     }
  //   })
  // },
  // bindGetUserInfo: function (e) {
  //   if (e.detail.userInfo) {
  //     //用户按了允许授权按钮
  //     var that = this;
  //     //插入登录的用户的相关信息到数据库
  //     wx.request({
  //       url: getApp().globalData.urlPath + 'hstc_interface/insert_user',
  //       data: {
  //         openid: getApp().globalData.openid,
  //         nickName: e.detail.userInfo.nickName,
  //         avatarUrl: e.detail.userInfo.avatarUrl,
  //         province: e.detail.userInfo.province,
  //         city: e.detail.userInfo.city
  //       },
  //       header: {
  //         'content-type': 'application/json'
  //       },
  //       success: function (res) {
  //         //从数据库获取用户信息
  //         that.queryUsreInfo();
  //         console.log("插入小程序登录用户信息成功！");
  //       }
  //     });
  //     //授权成功后，跳转进入小程序首页
  //     wx.navigateTo({
  //       url: ''
  //     })
  //   } else {
  //     //用户按了拒绝按钮
  //     wx.showModal({
  //       title: '警告',
  //       content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
  //       showCancel: false,
  //       confirmText: '返回授权',
  //       success: function (res) {
  //         if (res.confirm) {
  //           console.log('用户点击了“返回授权”')
  //         }
  //       }
  //     })
  //   }
  // },
  // //获取用户信息接口
  // queryUsreInfo: function () {
  //   wx.request({
  //     url: getApp().globalData.urlPath + 'hstc_interface/queryByOpenid',
  //     data: {
  //       openid: getApp().globalData.openid
  //     },
  //     header: {
  //       'content-type': 'application/json'
  //     },
  //     success: function (res) {
  //       console.log(res.data);
  //       getApp().globalData.userInfo = res.data;
  //     }
  //   }) 
  // },

  openConfirm: function () {
    //点击“授权登录”弹窗
    wx.showModal({
      title: '微信一键登录',
      content: '申请获取你的微信进行登录',
      confirmText: "确认授权",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          //点击“授权”按钮
          wx.redirectTo({
            url: '/pages/register/register',
          })
        } else {
          //取消授权弹窗
          wx.showModal({
            content: '你已经取消授权登录',
            showCancel: false,
            confirmText: '返回授权'
          });
        }
      }
    });
  },

  //button回调
  onGotUserInfo(e) {
    var _this = this;
    if (e.detail.userInfo) {
      wx.setStorage({
        key: "userInfo",
        data: e.detail.userInfo,
        success() {
          _this.login()
        }
      })
    } else {
      wx.navigateBack({
        delta: 0
      })
    }
  },

  login() {
    var _this = this;
    var user = wx.getStorageSync('user');//登录过后，用户信息会缓存
    if (!user) {//没有登录
      _this.getShouquanInfo();
    }

  },

  //去登录页登录
  gotoLoginPage() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },

  //看是否授权
  getShouquanInfo() {
    var _this = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          _this.gotoLoginPage();
        } else {
          _this.loginApi();
        }
      }
    })
  },

  //执行登录
  loginApi() {
    var _this = this;
    wx.login({
      success(res) {
        _this.getOpentId(res.code);
      }
    })
  },

  //获取openId http://123.56.203.175:8080/WXSmallProgram_Jiekou/SmallProgramWXGetOpenid_Jiekou.aspx?code=
  getOpentId(code) {
    var _this = this;
    wx.request({
      url: "接口地址",
      data: {
        code: code
      },
      success(res) {
        _this.realLogin(res.data.unionid);
      }
    })
  },

  //请求登录接口
  realLogin(name) {
    var userInfo = wx.getStorageSync('userInfo');
    wx.request({
      url: "接口地址",
      data: {
        type: "wx",
        user_name: name,
        user_nincheng: userInfo.nickName,
        user_touxing: userInfo.avatarUrl,
        user_sex: userInfo.gender
      },
      success(res) {
        wx.setStorage({
          key: 'user',
          data: res.data,
          success() {
            wx.navigateBack({
              delta: 1
            })
          }
        })
      }
    })
  },

  onUnload: function () {
    console.log('App onHide');

  },


  // 授权登录
  doLogin:function(e){

      var that = this;
      if (!e.detail.userInfo) {
        app.alert({ 'content': '登录失败，请再次点击' });
        return;
      }
      wx.login({
        success: function(res){
          console.log(res)
          // 获取登录的临时凭证
          var code = res.code;
          // 调用后端，获取信息
          wx.request({
            // URL需换成本地的 
            url: 'https://xueyoutong.xyz/member/login',
            method: 'POST',
            date: code,
            success: function (res) {
              console.log(res)
              if (code != 200) {
                wx.redirectTo({
                  url: '/pages/register/register',
                })
                app.alert({ 'content': res.data.msg });
                return;
              }
              app.setCache("token", res.data.data.token);
            }
          })
        }
      })
       
  },

  agreeGetUser: function (e) {
    var that = this;
    that.setData({
      disabled: true,
    })
    app.login(e);
  }

})

