// pages/mycoach/mycoach.js
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
      width:"coach"
    },
    wechateNumber:{
      title:"微信号码",
      count:"852025874158963",
      if:false,  //是否有右箭头 
    },
    phoneNumber:{
      title:"手机号",
      count:"1533345585",
      if:false,  //是否有右箭头
    },

    data:[
      {
        user:{
          img:"/images/header.jpg",
          nickname:"昵称啊",
          wechateNumber:"8520963741",
          sex:0,
          width:"coach"
        },
        wechateNumber:{
          title:"微信号码",
          count:"852025874158963",
          if:false,  //是否有右箭头 
          ifcopy:true
        },
        phoneNumber:{
          title:"手机号",
          count:"1533345585",
          if:false,  //是否有右箭头
          ifcopy:true
        },
      },
      {
        user:{
          img:"/images/header.jpg",
          nickname:"昵称啊",
          wechateNumber:"8520963741",
          sex:0,
          width:"coach"
        },
        wechateNumber:{
          title:"微信号码",
          count:"852025874158963",
          if:false,  //是否有右箭头 
          ifcopy:true
        },
        phoneNumber:{
          title:"手机号",
          count:"1533345585",
          if:false,  //是否有右箭头
          ifcopy:true
        },
      },{
        user:{
          img:"/images/header.jpg",
          nickname:"昵称啊",
          wechateNumber:"8520963741",
          sex:0,
          width:"coach"
        },
        wechateNumber:{
          title:"微信号码",
          count:"852025874158963",
          if:false,  //是否有右箭头 
          ifcopy:true
        },
        phoneNumber:{
          title:"手机号",
          count:"1533345585",
          if:false,  //是否有右箭头
          ifcopy:true
        },
      },
    ]
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