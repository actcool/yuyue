// pages/scan/scan.js
import{
  scan
} from "../../models/scan"
const Scan = new scan()



Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId : '',
    userRole : '' ,
    beId : '',
    beRole : '',
    imc : '',
    chackname : ''
  },


  yes(){
    let data = this.data
    let that = this
    if(this.data.userRole==3){
      wx.showModal({
        content: '请选择您要将TA添加的科目',
        confirmText : '科目二',
        cancelText : '科目三',
        success (res) {
          if (res.confirm) {
            wx.showLoading({
              title: '加载中...',
              mask : true
            })
            setTimeout(function () {
              wx.hideLoading()
              that.setData({
                hideLoading : false
              })
            }, 3000)
            that.submit(data,2)
          } else if (res.cancel) {
            wx.showLoading({
              title: '加载中...',
              mask : true
            })
            setTimeout(function () {
              wx.hideLoading()
              that.setData({
                hideLoading : false
              })
            }, 3000)
            that.submit(data,3)
          }
        }
      })
    }
    else{
      wx.showLoading({
        title: '加载中...',
        mask : true
      })
      setTimeout(function () {
        wx.hideLoading()
        that.setData({
          hideLoading : false
        })
      }, 3000)
      this.submit(data,123123)
    }    
  },

  no(){
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    getApp().setWatcher(this.data, this.watch); // 设置监听器

    let identity = options.identity
    let userId = options.userId
    var user = wx.getStorageSync('user')
    this.setData({
      userId : user.userid,
      userRole : user.role,
      beId : userId,
      beRole : identity
    })
    if(user.role==0||user.role==1){    //学员游客没有扫一扫
      wx.showToast({
        title: '操作违法',
        icon: 'loading',
        duration: 1000
      })
      setTimeout(funcName,2000);
      function funcName() {
        wx.navigateBack({
          delta: 1
        })
      } 
    }
    //获取被扫人信息
    Scan.showSb(userId)
      .then((res)=>{
        if(res.code==200){
          this.setData({
            imc : res.content.userPhoto ,
            chackname : res.content.userpetname
          })
        }else{
          wx.showToast({
            title: '操作失败',
            icon: 'loading',
            duration: 1000
          })
          setTimeout(funcName,2000);
          function funcName() {
            wx.navigateBack({
              delta: 1
            })
          } 
        }
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  


  submit(data,haha){     //haha 用来判断科二还是科三   校长扫教练时候
    Scan.doit(data.userId, data.userRole, data.beId, data.beRole,haha)
        .then((res)=>{
          console.log(res)
          if(res.code==200){
            wx.hideLoading()
            wx.showToast({
              title: '添加成功',
              icon: 'success',
              duration: 1000
            })
            setTimeout(funcName,1500);
            function funcName() {
              wx.navigateBack({
                delta: 1
              })
            } 
          }
          if(res.code==605){
            wx.showToast({
              title: '已存在',
              icon: 'success',
              duration: 1000
            })
          }
          if(res.code!=200&&res.code!=605){
            wx.showToast({
              title: '操作失败',
              icon: 'loading',
              duration: 1000
            })
          }
        })
  },

  watch:{
    hideLoading:function(hideLoading){
      if(hideLoading){
        wx.hideLoading()
      }
    }
  },

})