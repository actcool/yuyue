// pages/state/state.js
import {
	state
} from '../../models/state'
const mystate = new state();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:[
     
    ],
    userId:''
  },

  cancle(event){
    let that =this
    var set = "data[" + event.target.dataset.index + "].order_status"
    console.log(event.target.dataset.item)
    let e=event.target.dataset.item
    if(e.order_status==0){
      wx.showModal({
        title: e.startTime + '-'+ e.endTime + ' ' +e.subject ,
        content: '您确定要取消该预约吗？',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            mystate.cancel(e.order_id,'2')
              .then((res)=>{
                console.log(res)
                if(res.code==200){
                  that.setData({
                    [set] : 2
                  })
                  wx.showToast({
                    title: '操作成功',
                    icon: 'success',
                    duration: 2000
                  })
                  
                }
                else{
                  wx.showToast({
                    title: '操作失败',
                    icon: 'loading',
                    duration: 2000
                  })
                  
                }
              })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
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
      mystate.getall(user.roleId)
      .then((res)=>{
        console.log(res)
        this.setData({
          data:res.content,
          userId : user.userId
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

  onPullDownRefresh(){
    let user = wx.getStorageSync('user')
    if(user.hasUserInfo){
      mystate.getall(user.roleId)
      .then((res)=>{
        console.log(res)
        this.setData({
          data:res.content,
          userId : user.userId
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
    wx.stopPullDownRefresh()
  }
})