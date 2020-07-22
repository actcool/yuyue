// pages/user_detail/user_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ifcmp:false,
    header:{
      title:"头像",
      count:"/images/header.jpg",
      // navigate:"",
      if:false,  //是否有右箭头
      
    },
    nickName:{
      title:"微信昵称",
      count:"这是一个昵称",
      if:false,  //是否有右箭头
      wechateNumber:"852025874158963",
      ifcopy:false
    },
    sex:{
      title:"性别",
      count:"女",
      if:false,  //是否有右箭头
      ifcopy:false
    },
    wechateNumber:{
      title:"微信号码",
      count:"852025874158963",
      if:false,  //是否有右箭头
      ifcopy:true
    },
    name:{
      title:"姓名",
      count:"名字啊",
      if:true,  //是否有右箭头
      ifcopy:false
    },
    role:{
      title:"身份",
      count:"待管理员确认",
      if:false,  //是否有右箭头
      ifcopy:false
    },
    phoneNumber:{
      title:"手机号",
      count:"1533345585",
      if:true,  //是否有右箭头
      ifcopy:false
    },
  },


  input(){
    this.setData({
      ifcmp : true
    })
  },
  cancelInput(){
    this.setData({
      ifcmp : false
    })
  },
  no(e){
    this.setData({
      ifcmp : false
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