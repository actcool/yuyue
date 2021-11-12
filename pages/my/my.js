import {
	My
} from '../../models/my'
const my = new My();

const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    ifcmp : true,
    userInfo: '',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    iflogin:false,
    user:{
      
    },
    state:{
      title:"我的预约",
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
    leave:{
      title:"请假",
      icon:"leave",
      class:"mt"
    },
    fleet:{
      title:"我的车队",
      icon:"fleet",
      class:"mt"
    },
    myStudent:{
      title:"学员管理",
      icon:"Group",
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
    },

    leaveArray: [['27号', '28号','29号','30号'], ['06:00', '10:00','14:00', '16:00']],
    workArray:[ ['倒车入库','跑圈'],['红一','红二','红三','红四','红五'] ],

  },



  userDetail(){
    let user = JSON.stringify(this.data.user)
    wx.navigateTo({
      url: "../user_detail/user_detail?user="+user,
    })
  },

  state(){
    wx.navigateTo({
      url: '../state/state',
    })
  },
  
  coach(){
    wx.navigateTo({
      url: '../mycoach/mycoach',
    })
  },

  leave(){
    wx.navigateTo({
      url: '../leave/leave',
    })
  },
  work(){
    wx.navigateTo({
      url: '../workplan/workplan',
    })
  },

  myfleet(){
    wx.navigateTo({
      url: '../myfleet/myfleet',
    })
  },

  myStudent(){
    wx.navigateTo({
      url: '../myStudent/myStudent',
    })
  },
  manage(){
    wx.navigateTo({
      url: '../manage/manage',
    })
  },

  scan(){
    wx.scanCode({
      success (res) {
            let result = JSON.parse(res.result)
            if(result.hasOwnProperty("userId")&&result.hasOwnProperty("identity")){
              let userId = result.userId;
              let identity = result.identity;
              console.log(identity)
              console.log(userId)
              wx.showToast({
                title: '扫码成功',
                icon: 'success',
                duration: 1500
              })
              wx.navigateTo({
                url: '../scan/scan?userId='+ userId +"&identity="+identity,
              })
            }else{
              wx.showToast({
                title: '扫码失败',
                icon: 'loading',
                duration: 1500
              })
            }
      }
    })    
  },
  QrCode(){
    wx.navigateTo({
      url: '../QrCode/QrCode',
    })
  },
  feedback(){
    wx.navigateTo({
      url: '../feedback/feedback',
    })
  },

  out(){
    this.setData({
      hasUserInfo : false
    })
    wx.clearStorageSync("user")
    wx.clearStorageSync("teamId")
    wx.closeSocket()
    wx.showToast({
      title: '已退出登录',
    })
  },

  getUserInfo: function(e) {
    wx.showLoading({
      title: '登录中',
      mask : true
    })
    // setTimeout(function () {
    //   wx.hideLoading()
    // }, 2000)

    let iv = e.detail.iv
    let encryptedData = e.detail.encryptedData
    let that=this
    wx.login({
      success(res){
        if (res.code) {
          let code= res.code
          my.login(code,iv,encryptedData)
            .then((res)=>{
              if(res.code==200){
                wx.hideLoading()
                setTimeout(function () {
                  wx.showToast({
                    title: '登录成功',
                  })
                }, 50)
                setTimeout(function () {
                  app.globalData.ifSocket = true;
                }, 3000)
                
                that.setData({
                  hasUserInfo:true,
                  user:{
                    img:res.content.user_photo ,
                    name:res.content.username,
                    phoneNumber:res.content.user_mobile,
                    sex:res.content.usersex,
                    role : res.content.useridentity,
                    width:"my"
                  },
                })
                wx.setStorage({
                  key: 'user',
                  data: {
                    userid:res.content.userid,
                    user_photo:res.content.user_photo,
                    userpetname:res.content.userpetname,  //昵称
                    username:res.content.username,  //真实姓名
                    usersex:res.content.usersex,
                    hasUserInfo:true,
                    phoneNumber:res.content.user_mobile,
                    role : res.content.useridentity,  //身份          0游客  1学员 2教练  3校长
                    teach :  res.content.item,        
                    roleId : res.content.identityId,
                    coachId : res.content.defaultCoachId,            //学生默认教练  身份为教练则取值0a  
                    coachName : res.content.coachName, //学生默认教练 
                  },
                  success: function (res) {
                    console.log("登陆缓存" + res)
                  }
                })
                wx.setStorage({
                  key:"teamId",
                  data:res.content.teamId,
                })
               
              }else{
                wx.hideLoading()
                setTimeout(function () {
                  wx.showToast({
                    icon : 'loading',
                    title: '登陆失败',
                  })
                }, 50)
              }
            })
        } 
        else {
          console.log('登录失败！' + res.errMsg)
          wx.showToast({
            title: '登陆失败',
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let user = wx.getStorageSync('user')
    console.log(user)
    
    this.setData({
      hasUserInfo : user.hasUserInfo,
      user:{
        phoneNumber:user.phoneNumber,
        role:user.role,
        img:user.user_photo ,
        name:user.username,
        sex:user.usersex,
        width:"my"
      },
    })

    // wx.onSocketMessage((res)=>{
    //   console.log("Myres↓")
    //   console.log(res)
    //   console.log("Myres↓")
    // })
    getApp().setWatcher(this.data, this.watch); // 设置监听器


  },
  watch:{
    hasUserInfo:function(hasUserInfo){
      if(hasUserInfo){
        wx.hideLoading()
      }
    }
  },

  onShow: function () {
    wx.onSocketMessage((res)=>{
      console.log(res)
      
    })
},


  onPullDownRefresh() {
    // let role = wx.getStorageSync('user').role
    // this.setData({
    //   [`user.role`] : role
    // })
    let user = wx.getStorageSync('user')
    my.Refresh(user.userid)
      .then((res)=>{
        console.log(res)
        user.role = res.content.useridentity
        user.teach = res.content.item
        user.roleId = res.content.identityId
        user.caochId = res.content.defaultCoachId
        wx.setStorageSync('user', user)
        wx.setStorageSync('teamId', res.content.teamId)
        this.setData({
          [`user.role`] : res.content.useridentity
        })
      })
    setTimeout(function () {
      wx.stopPullDownRefresh()
    }, 1200)
  },

  

})