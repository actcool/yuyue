import {
	coach
} from '../../models/mycoach'
const mycoach = new coach();



Page({

  /**
   * 页面的初始数据
   */
  data: {
    allcaoch:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let user = wx.getStorageSync('user')
    mycoach.getall(user.coachId)
      .then((res)=>{
        console.log(res)
        this.setData({
          allcaoch : res.content
        })
      })
  },


  onPullDownRefresh() {
    mycoach.getall("486620585934192640")
      .then((res)=>{
        console.log(res)
        this.setData({
          allcaoch : res.content
        })
      })
     
      setTimeout(function () {
        wx.stopPullDownRefresh()
      }, 1200) 
  },


})