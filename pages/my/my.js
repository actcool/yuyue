// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{
      img:"/images/header.jpg",
      nickname:"昵称啊",
      wechateNumber:"8520963741",
      sex:0,
      width:"my"
    },
    state:{
      title:"预约状态",
      icon:"zhuangtai1",
      class:"mt"
    },
    coach:{
      title:"我的教练",
      icon:"coach",
      class:"mt"
    },
    work:{
      title:"工作安排",
      icon:"richenganpai",
      class:"mt"
    },
    fleet:{
      title:"我的车队",
      icon:"fleet",
      class:"mt"
    },
    manage:{
      title:"人员管理",
      icon:"Group",
      class:"mt"
    },
    scan:{
      title:"扫一扫",
      icon:"scan",
      class:"mt"
    },
    QrCode:{
      title:"我的二维码",
      icon:"QrCode",
      class:"mt"
    },
    feedback:{
      title:"意见反馈",
      icon:"feedback",
      class:"nomt"
    }
  },

  userDetail(){
    console.log("asd")
    wx.navigateTo({
      url: "../user_detail/user_detail",
      // events: events,
      // success: (result) => {},
      // fail: (res) => {},
      // complete: (res) => {},
    })
  },

  coach(){
    wx.navigateTo({
      url: '../mycoach/mycoach',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})