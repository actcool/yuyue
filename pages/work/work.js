import{
  Work
} from "../../models/work.js"
const work = new Work()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    user : '',
    teamId : '',
    status : '',   //状态
    tempOrder : '',   //临时名额
    timeArray: [
      
    ], 
    timeData:[

    ],
    timeIndex : 0,
    studentsArray :[],
    studentsData : '',
    studentsIndex : '',
    tempArray:[
      '0','1','2','3','4','5',
    ],
    tempIndex : '',
    Index:0,
    index:0,
    carArray :  ['红一','红二','红三','红四','红五','红六','红七','红八','红九','红十','红十一','红十二','蓝一','蓝二','蓝三','蓝四','蓝五','蓝六','蓝七','蓝八','蓝九','蓝十','蓝十一','蓝十二'] ,
    projects:['待定','倒车入库','跑圈','科目二','科目三'],
    carIndex : '',
    projectIndex : '' ,
    
    hideLoading : false
    // tempNum : '',
    // zhengshiNum : ''
  },
  


  //picker 时段
  PickerTime: function(e) {
    this.setData({
      timeIndex: e.detail.value
    })
    this.getDetail(this)
  },

  PickerTemp: function(e) {
    this.setData({
      tempIndex: e.detail.value
    })
    let coachId = this.data.user.roleId
    let startTime = this.data.timeData[this.data.timeIndex].start_time
    let endTime =  this.data.timeData[this.data.timeIndex].end_time
    let count = parseInt(this.data.tempArray[e.detail.value])
    work.changeTemp(coachId,startTime,endTime,count)
      .then((res)=>{
        console.log(res)
        if(res.code==200){
          wx.showToast({
            title: '修改成功',
          })
        }
        if(res.code!=200){
          wx.showToast({
            title: '修改失败',
            icon : 'none'
          })
        }

      })
  },

  confirm(e){
    let index = e.currentTarget.dataset.index
    work.confirm(this.data.studentsData[index].order_id)
      .then((res)=>{
        wx.showLoading({
          title: '加载中...',
          mask : true
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 1500)
        if(res.code==200){
          wx.hideLoading()
          wx.showToast({
            title: '操作成功'
          })
          this.setData({
            [`studentsData[${index}].order_status`]: 1,
            hideLoading : true
          })
        }
        if(res.code!=200){
          wx.hideLoading()
          wx.showToast({
            title: '操作失败',
            icon : 'none'
          })
        }
      })
  },

  onLoad: function (options) {

    let user = wx.getStorageSync('user')
    if(user.role==2){
      let teamId = wx.getStorageSync('teamId')
      this.setData({
        user : user,
        teamId : teamId
      })
      work.onLoad(user.roleId)
        .then((res)=>{
          console.log(res)
          if(res.code==200){
            this.setData({
              carIndex : res.content.nowCar,
              projectIndex : res.content.nowSubject,
              status : res.content.status,
              tempOrder : res.content.tempOrder,
              tempIndex : res.content.tempOrder
            })
            let time = res.content.time
            console.log("time↓")
            console.log(time)
            for(let i=0,j=0; i<time.length ; i++){
              if(time[i].flag!=1){
                console.log("i="+i)
                console.log(time[i])
                this.setData({
                  [`timeData[${j}]`] : time[i],
                  [`timeArray[${j}]`] : time[i].start_time+"-"+time[i].end_time,
                })
                j++
              }
            }
            this.getDetail(this)
          }
        })
    }
    if(user.role!=2){
      wx.showToast({
        title: '您不是教练',
        icon : 'none'
      })
    }
    


    


  },
  onShow: function () {
    
    wx.onSocketMessage((res)=>{
      console.log(res)
      if(res.data==1){
        this.getDetail(this)
      }
    })  
},


  getDetail(that){
    console.log("getDetail")
    let startTime = that.data.timeData[that.data.timeIndex].start_time
    let endTime =  that.data.timeData[that.data.timeIndex].end_time
    let coachId = that.data.user.roleId 
    work.getDetail(coachId,startTime,endTime)
      .then((res)=>{
        console.log(res)
        that.setData({
          studentsData : res.content,
        })
      })
  },


  
  onPullDownRefresh(){
    let user = wx.getStorageSync('user')
    if(user.role==2){
      let teamId = wx.getStorageSync('teamId')
      this.setData({
        user : user,
        teamId : teamId
      })
      work.onLoad(user.roleId)
        .then((res)=>{
          console.log(res)
          if(res.code==200){
            this.setData({
              carIndex : res.content.nowCar,
              projectIndex : res.content.nowSubject,
              status : res.content.status,
              tempOrder : res.content.tempOrder,
              tempIndex : res.content.tempOrder
            })
            let time = res.content.time
            for(let i=0,j=0; i<time.length ; i++){
              if(time[i].flag!=1){
                this.setData({
                  [`timeData[${j}]`] : time[i],
                  [`timeArray[${j}]`] : time[i].start_time+"-"+time[i].end_time,
                })
                j++
              }
            }
            this.getDetail(this)
          }
        })
    }
    if(user.role!=2){
      wx.showToast({
        title: '您不是教练',
        icon : 'none'
      })
    }
    setTimeout(function () {
      wx.stopPullDownRefresh()
    }, 1200)
  }
})