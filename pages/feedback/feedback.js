import {
  feedBack
} from '../../models/feedback'
const feedback = new feedBack()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId:'',
    ifNull : false,
    feedWords:'',
    value:'',
    allFeedBack : ''
  },



  feedInput(e){
    this.setData({
      feedWords : e.detail.value
    })
  },
  submit(){
    if(this.data.feedWords.length<6){
      wx.showToast({
        title: '字数太少啦~',
        icon : 'loading',
        duration : 1400
      })
    }
    else{
      feedback.submit(this.data.userId,this.data.feedWords)
      .then((res)=>{
        if(res.code==200){
          wx.showToast({
            title: '操作成功',
            icon : 'success',
            duration : 2000,
            mask : true
          })
          this.setData({
            feedWords : '',
            value : ''
          })
          feedback.getall(this.data.userId)
            .then((res)=>{
              this.setData({
                allFeedBack : res.content
              })
            })
        }
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let user = wx.getStorageSync('user')
    if(user.hasUserInfo){
      this.setData({
        userId : user.userid
      })
      feedback.getall(user.userid)
        .then((res)=>{
          console.log(res)
          if(res.content.length==0){
            this.setData({
              ifNull : true
            })
          }
          this.setData({
            allFeedBack : res.content
          })
        })
    }
    else{
      wx.showToast({
        title: '请先登录',
        icon : 'none'
      })
      setTimeout(funcName,2000);
          function funcName() {
            wx.navigateBack({
              delta: 1
            })
        } 
    }
    
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