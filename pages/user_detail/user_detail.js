import {
  user_detail
} from "../../models/user_detail"
const detail = new user_detail()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    storage : '',
    changeKey : '' ,
    verify:'',
    change:"",
    cmpShow:'',
    ifcmp:false,
    header:{
    },
    nickName:{
      
    },
    sex:{
      
    },
    name:{
     
    },
    role:{
      
    },
    phoneNumber:{
     
    },
  },


  inputName(){
    this.setData({
      ifcmp : true,
      change:"name",
      changeKey : '1' ,
      cmpShow:this.data.name.count
    })
  },
  inputNumber(){
    let that = this
    wx.showModal({
      title: '确定输入吗',
      content: '手机号将向教练或校长显示',
      success (res) {
        if (res.confirm) {
          that.setData({
            ifcmp : true,
            change:"phoneNumber",
            changeKey : '2' ,
            cmpShow:that.data.phoneNumber.count
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  cancelInput(){
    this.setData({
      ifcmp : false
    })
  },
  no(e){
    console.log(e)
    this.setData({
      ifcmp : false,
      change:"",
    })
  },
  yes(e){
    let change = this.data.change + '.count' 
    let storage = this.data.storage
    let that = this
    if(e.detail.verify.length>0){
      this.setData({
        ifcmp : false,
      })
      detail.change(this.data.storage.userid,this.data.changeKey,e.detail.verify)
        .then((res)=>{
          console.log(res)
          if(res.code==200){
            that.setData({
              verify : e.detail.verify,
              [change] : e.detail.verify
            })
            wx.showToast({
              title: '修改成功',
              icon : 'success'
            })
            if(that.data.changeKey==1){
              storage.username = res.content
            }
            if(that.data.changeKey==2){
              storage.phoneNumber = res.content
            }
            wx.setStorage({
              key:'user',
              data : storage
            })
          }
          if(res.code==601){
            wx.showToast({
              title: '格式错误',
              icon : 'none'
            })
          }
          if(res.code!=200&&res.code!=601){
            wx.showToast({
              title: '操作失败',
              icon : 'none'
            })
          }
        })
    }
    if(e.detail.verify.length==0){
      wx.showToast({
        title: '不能为空哦~',
        icon : 'none'
      })
    }
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let user = wx.getStorageSync('user')
    this.setData({
      storage :user
    })

    // let user = JSON.parse(options.user)
    let sex
    let role="待管理员确认"
    if(user.usersex==1){
      sex = "男"
    }else{
      sex = "女"
    };

    
    if(user.role==1){
      role="学员"
    }
    if(user.role==0){
      role="游客"
    }
    if(user.role==2){
      role="教练"
    }
    if(user.role==3){
      role="校长"
    }

    this.setData({
      header:{
        title:"头像",
        count:user.user_photo,
        navigate:"",
        if:false,  //是否有右箭头
      },
      nickName:{
        title:"微信昵称",
        count:user.userpetname,
        if:false,  //是否有右箭头
        ifcopy:false
      },
      sex:{
        title:"性别",
        count:sex,
        if:false,  //是否有右箭头
        ifcopy:false
      },
      name:{
        title:"姓名",
        count: user.username,
        if:true,  //是否有右箭头
        ifcopy:false
      },
      role:{
        title:"身份",
        count:role,
        if:false,  //是否有右箭头
        ifcopy:false
      },
      phoneNumber:{
        title:"手机号",
        count:user.phoneNumber,
        if:true,  //是否有右箭头
        ifcopy:false
      },
      
      // "name.count":user.username,
      // "role":role
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