import {
	leave
} from '../../models/leave'
const Leave = new leave();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    aa:"      ",
    user : '',
    roleId : '',
    cmpShow:'请输入请假事由',
    ifcmp : false,
    leaveArray: [['27号', '28号','29号','30号'], ['06:00', '10:00','14:00', '16:00']],
    touch : {
      x : '',
      y : ''
    },
    allLeave : '' ,
    leaveIndex : 0,

    laohei : false
  },


  //修改日期
  bindStartDateChange: function (e) {
    console.log('picker发送选择改变，请假开始日期，携带值为', e.detail.value)
    let change = "allLeave[" + this.data.leaveIndex + "].startDate"
    this.setData({
      [change]: e.detail.value
    })
  },
  bindEndDateChange: function (e) {
    console.log('picker发送选择改变，请假开始时间，携带值为', e.detail.value)
    let change = "allLeave[" + this.data.leaveIndex + "].endDate"
    this.setData({
      [change]: e.detail.value
    })
  },
  //修改时间
  bindStartTimeChange: function (e) {
    console.log('picker发送选择改变，请假结束日期，携带值为', e.detail.value)
    let change = "allLeave[" + this.data.leaveIndex + "].startTime"
    this.setData({
      [change]: e.detail.value
    })
  },
  bindEndTimeChange: function (e) {
    console.log('picker发送选择改变，请假结束时间，携带值为', e.detail.value)
    let change = "allLeave[" + this.data.leaveIndex + "].endTime"
    this.setData({
      [change]: e.detail.value
    })
  },


  submit(){
    let that =this
    let leaveIndex = this.data.leaveIndex
    let start=this.data.allLeave[leaveIndex].startDate+ ' '+this.data.allLeave[leaveIndex].startTime
    let end = this.data.allLeave[leaveIndex].endDate + ' ' +this.data.allLeave[leaveIndex].endTime
    let leaveId = this.data.allLeave[leaveIndex].leave_id
    console.log(leaveId)

    wx.showLoading({
      title: '提交中...',
      mask : true
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 3000)

    Leave.submit(leaveId,this.data.roleId,start,end,this.data.allLeave[leaveIndex].content )
      .then((res)=>{
        console.log(res)
        if(res.code==200){
          wx.hideLoading()
          wx.showToast({
            title: '操作成功',
            icon: 'success',
            duration: 2000
          })
          Leave.getAll(that.data.user.roleId)
            .then((res)=>{
              console.log(res)
              this.setData({
                allLeave : res.content,
                leaveIndex : 0
              })
            })
          
        }
        if(res.code==509){
          wx.hideLoading()
          wx.showToast({
            title: '时间打反啦~',
            icon: 'none',
            duration: 2000
          })
        }
        if(res.code==700){
          wx.hideLoading()
          wx.showToast({
            title: '已有该假条~',
            icon: 'none',
            duration: 2000
          })
        }
        if(res.code==701){
          wx.hideLoading()
          wx.showToast({
            title: '该假条与其他假条合并~',
            icon: 'none',
            duration: 2000
          })
          Leave.getAll(that.data.user.roleId)
            .then((res)=>{
              console.log(res)
              this.setData({
                allLeave : res.content,
                leaveIndex : 0
              })
            })
        }
        if(res.code!==200&&res.code!==509&&res.code!==700&&res.code!==701){
          wx.hideLoading()
          wx.showToast({
                title: '操作失败',
                icon: 'none',
                duration: 2000
              })
        }
      })
  },
  cancel(){
    let that = this
    wx.showModal({
      content: '您确定要撤销该假条吗？',
      success (res) {
        
          wx.showLoading({
            title: '提交中...',
            mask : true
          })
          setTimeout(function () {
            wx.hideLoading()
          }, 2000)


        if (res.confirm) {
          Leave.cancel(that.data.allLeave[that.data.leaveIndex].leave_id)
          .then((res)=>{
            console.log(res)
            if(res.code==200){
              wx.hideLoading()
              let arr = that.data.allLeave
              arr.splice(that.data.leaveIndex,1) 
              that.setData({
                allLeave : arr,
                leaveIndex : 0
              })       
              wx.showToast({
                title: '操作成功',
                icon: 'success',
                duration: 2000
              })
            }
            else{
              wx.hideLoading()
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
    
  },
  inputReason(e){
    this.setData({
      ifcmp : true,
   });
  },
  no(e){
    this.setData({
      ifcmp : false,
    })
  },
  yes(e){
    let change = "allLeave[" + this.data.leaveIndex + "].content"
    this.setData({
      ifcmp : false,
      [change] : e.detail.verify
    })
  },
  touchStart(e) {
    this.setData({
      "touch.x": e.changedTouches[0].clientX,
      "touch.y": e.changedTouches[0].clientY
    });
  },
  touchEnd(e) {
    let endX = e.changedTouches[0].clientX;
    let endY = e.changedTouches[0].clientY;
    let startX = this.data.touch.x
    let startY = this.data.touch.y
    let length = this.data.allLeave.length - 1
    let index = this.data.leaveIndex
    if (endX - startX > 50 && Math.abs(endY - startY) < 50){  //右滑
      if(index==0){
        this.setData({
          leaveIndex : length
        })
      }
      if(index<=length&&index>0){
        this.setData({
          leaveIndex : --index
        })
      }
    }
    if (endX - startX < -50 && Math.abs(endY - startY) < 50){  //左滑
      
      if(index==length){
        this.setData({
          leaveIndex : 0
        })
      }
      if(index<length){
        this.setData({
          leaveIndex : ++index
        })
      }
    }

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let user = wx.getStorageSync('user')
    this.setData({
      roleId : user.roleId,
      user : user
    })


    Leave.getAll(user.roleId)
      .then((res)=>{
        console.log(res)
        this.setData({
          allLeave : res.content
        })
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },







  onPullDownRefresh() {
    
    let user = wx.getStorageSync('user')
    this.setData({
      roleId : user.roleId
    })


    Leave.getAll(user.roleId)
      .then((res)=>{
        console.log(res)
        this.setData({
          allLeave : res.content
        })
      })
      setTimeout(function () {
        wx.stopPullDownRefresh()
      }, 1200)
  },
})