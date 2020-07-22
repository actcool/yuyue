// pages/state/state.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:[
      {
        day:"2020.07.28",
        hour:"08:00-10:00",
        count:"安教-红花-跑圈",
        ifEffective : true , //是否生效
      },
      {
        day:"2020.07.28",
        hour:"08:00-10:00",
        count:"范教-红花-倒库-临时名额",
        ifEffective : true , //是否生效
      },
      {
        day:"2020.07.27",
        hour:"08:00-10:00",
        count:"安教-红花-跑圈",
        ifEffective : false , //是否生效
      },
      {
        day:"2020.07.26",
        hour:"08:00-10:00",
        count:"安教-红花-跑圈",
        ifEffective : false , //是否生效
      },
      {
        day:"2020.07.25",
        hour:"08:00-10:00",
        count:"安教-红花-跑圈",
        ifEffective : false , //是否生效
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