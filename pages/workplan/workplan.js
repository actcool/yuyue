import {
  doPlan
} from "../../models/workPlan"
const doit = new doPlan();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    teamId : '',
    roleId : '',
    ifcmp : false,
    verify:'去考场',   //请假理由
    cmpShow:'去考场',
    flag:'',
    time : '',
    startTimeIndex:'0',
    endTimeIndex:'0',
    projcetIndex:0,
    carIndex:'',
    timeArray : [['06:00','08:00','10:00','14:00','14:00','16:30'],['06:00','08:00','10:00','12:00','14:00','16:30','19:00']],
    project:['倒车入库', '跑圈','全能'],
    car : ['红一','红二','红三','红四','红五','红六','红七','红八','红九','红十','红十一','红十二','蓝一','蓝二','蓝三','蓝四','蓝五','蓝六','蓝七','蓝八','蓝九','蓝十','蓝十一','蓝十二'] ,
    haveDoLeave : false
  },


  bindProjectChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      projcetIndex: e.detail.value
    })
  },
  bindCarChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      carIndex: e.detail.value
    })
  },
  submit(){
    let startTime = this.data.time+' '+ this.data.timeArray[0][this.data.startTimeIndex]
    let endTime = this.data.time+' '+ this.data.timeArray[1][this.data.endTimeIndex]
    console.log(startTime)
    console.log(endTime)
    doit.submit(this.data.roleId,this.data.projcetIndex,this.data.carIndex,this.data.verify,startTime,endTime)
      .then((res)=>{
        console.log(res)
        if(res.code==200){
          wx.showToast({
            title: '操作成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(funcName,3000);
          function funcName() {
            wx.navigateBack({
              delta: 1
            })
          } 
        }
        if(res.code==509){
          wx.showToast({
            title: '时间打反了吧~',
            icon: 'none',
            duration: 2000
          })
        }
        if(res.code!=200&&res.code!=509){
          wx.showToast({
                title: '操作失败',
                icon: 'none',
                duration: 2000
              })
        }

      })
        
  },
  leave(){
    wx.showToast({
      title: '去请假修改把~',
      icon : 'none',
      duration : 2000
    })
  },
  //确认
  bindMultiPickerChange: function (e) {
    this.setData({
      startTimeIndex:e.detail.value[0],
      endTimeIndex:e.detail.value[1]
    })
    // console.log('picker发送选择改变，携带值为', e.detail.value)
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let user = wx.getStorageSync('user')
    let teamId = wx.getStorageSync('teamId')
    this.setData({
      teamId : teamId
    })
    if(teamId==2){
      if(user.teach==2){
        this.setData({
          "project[0]" : "科目二"
        })
      }
      if(user.teach==3){
        this.setData({
          "project[0]" : "科目三"
        })
      }
    }
    this.setData({
      roleId : user.roleId
    })

    doit.doPlan(user.roleId)
      .then((res)=>{
        for(let i=0; i<5; i++){
          if(this.data.timeArray[0][i]==res.content.startTime){
            this.setData({
              startTimeIndex:i
            })
            break;
          }
        }
        for(let i=0; i<5; i++){
          if(this.data.timeArray[1][i]==res.content.endTime){
            if(i>0){
              this.setData({
                haveDoLeave : true
              })
            }
            this.setData({
              endTimeIndex:i
            })
            break;
          }
        }
        console.log(res)
        this.setData({
          time : res.content.time,
          projcetIndex : res.content.second_subject,
          carIndex : res.content.second_car,
          flag : res.content.flag,
        })
      })
  },

  
  input_reason(){
    this.setData({
      ifcmp : true,
    })
  },
  no(e){
    this.setData({
      ifcmp : false,
    })
  },
  yes(e){
    this.setData({
      ifcmp : false,
      verify : e.detail.verify
    })
  },
  onShow: function () {
},


  // 上拉刷新
  onPullDownRefresh() {            //和onload函数相同
    let user = wx.getStorageSync('user')
    this.setData({
      roleId : user.roleId
    })

    doit.doPlan(user.roleId)
      .then((res)=>{
        for(let i=0; i<5; i++){
          if(this.data.timeArray[0][i]==res.content.startTime){
            this.setData({
              startTimeIndex:i
            })
            break;
          }
        }
        for(let i=0; i<5; i++){
          if(this.data.timeArray[1][i]==res.content.endTime){
            if(i>0){
              this.setData({
                haveDoLeave : true
              })
            }
            this.setData({
              endTimeIndex:i
            })
            break;
          }
        }
        console.log(res)
        this.setData({
          time : res.content.time,
          projcetIndex : res.content.second_subject,
          carIndex : res.content.second_car,
          flag : res.content.flag,
        })
      })
      setTimeout(function () {
        wx.stopPullDownRefresh()
      }, 1200)
  },

})