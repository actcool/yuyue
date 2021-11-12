import {
  QrCode
} from '../../models/QrCode'
const Qr = new QrCode();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgData : "",
    user : ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let user = wx.getStorageSync('user')
    let userid = user.userid
    if(user.hasUserInfo){
      Qr.showCode(userid)
      .then((res)=>{
        console.log(res)
        if(res.code==200){
          this.setData({
            imgData:res.content,
            user : user
          })
        }else{
          setTimeout(back,2000)
          back(()=>{
            wx.navigateBack({
              delta: 1
            })
          })
        }
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
    wx.onSocketMessage((res)=>{
      if(res.data=="00"){
        wx.showToast({
          title: '扫码成功',
        })
        setTimeout(funcName,3000);
          function funcName() {
            wx.navigateBack({
              delta: 1
            })
        } 
        // Qr.Refresh(this.data.user.userid)
        //   .then((res)=>{
        //     console.log(res)
        //     var app = getApp();
        //     app.globalData.role = res.content.useridentity ;
        //     let user = wx.getStorageSync('user')
        //     user.role = res.content.useridentity
        //     user.teach = res.content.item
        //     user.roleId = res.content.identityId
        //     user.caochId = res.content.defaultCoachId
        //     wx.setStorageSync('user', user)
              
        //   })
        
      }
    })  
  },


})