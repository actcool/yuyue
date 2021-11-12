import{
  appointModel
} from '../../models/appoint.js'
const appoin = new appointModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    success:false,
    successOrder:{},
    weeks : ["星期日","星期一","星期二","星期三","星期四","星期五","星期六",],
    array: [], 
    Index:0,
    index:0,
    user : '',
    teamId : '',
    date : '',
    status : '',       //0没预约    1有预约     2正在练
    timeArray : [
      ['06:00','08:00'],
      ['08:00','10:00'],
      ['10:00','12:00'],
      ['14:00','16:30'],
      ['16:30','19:00']
    ],        
    carArray : ['红一','红二','红三','红四','红五','红六','红七','红八','红九','红十','红十一','红十二','蓝一','蓝二','蓝三','蓝四','蓝五','蓝六','蓝七','蓝八','蓝九','蓝十','蓝十一','蓝十二'] ,
    dateArray0:['今天','明天'],    
    dateArray:'',
    dateIndex : 0,
    projects:['倒车入库','跑圈','科目二','科目三'],
    projectArray:['倒车入库','跑圈'],  //用于picker
    projectIndex :  '',    //0倒库  1跑圈  2科二  3科三
    myCoachsArray : [],     //数组显示 picker
    myCoachs : [],         //按教练搜索
    myCoachsIndex : 0,
    coachIndex : '',
    
    teamCoachs : '',          //车队表单报名每个教练详情
    allforappoint : '',
    tempforappoint : '',
    byTime : true,
    ifCmp : false  ,

    orderIndex : 0,     //被选中的订单
    ordersStart : '',
    ordersEnd : '',

    ifNull : false,
  },
  

  //picker 选择日期
  Picker_Date: function(e) {
    let that = this
    let status = this.data.status
    this.setData({
      dateIndex: e.detail.value
    })
    
    this.setData({
      allforappoint : [],
      tempforappoint : []
    })

    if(this.data.teamId==2){      //单个教练 获取正式名额表单
      that.getMianBorder_teamCoach(that)
    }

    wx.showLoading({
      title: '加载中...',
      mask : true
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 1500)          
    
      
    if(this.data.teamId!=2){    //车队 获取正式名额表单  和临时
      if(this.data.byTime){       //按时间搜索
        that.getMianBorder_team(that)
      }
      if(!this.data.byTime){       //按教练搜索
        this.updateMycoach(this)
      }
      if(status==2 && this.data.byTime){    //获取临时名额表单
        that.getTempBorder_teamCoach(that)
      }
    }  
  },

  //picker 选择项目
  Picker_Project: function(e) {
    let that = this
    let status = this.data.status
    this.setData({
      projectIndex:  parseInt(e.detail.value) 
    })

    this.setData({
      allforappoint : [],
      tempforappoint : []
    })
    wx.showLoading({
      title: '加载中...',
      mask : true
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 1500) 
    
    if(this.data.teamId!=2){  //车队 获取名额表单    和临时
      if(this.data.byTime){       //按时间搜索
        that.getMianBorder_team(that)
      }
      if(!this.data.byTime){       //按教练搜索
        this.updateMycoach(this)
        
      }
      if(status==2 && this.data.byTime){    //获取临时名额表单
        that.getTempBorder_teamCoach(that)
      }
    }  
  },

  //picker 选择教练
  Picker_Coach: function(e) {
    let that = this
    this.setData({
      myCoachsIndex: e.detail.value
    })

    this.setData({
      allforappoint : [],
      tempforappoint : []
    })
    wx.showLoading({
      title: '加载中...',
      mask : true
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 1500) 

    if(this.data.teamId!=2){  //车队 获取正式名额表单
      this.getMianBorder_teamCoach(that)
    }  
  },


  //点击按 时间搜索
  byTime(){
    let that = this
    let status = this.data.status
    this.setData({
      byTime : true
    })

    if(status==2){ //获取临时名额表单
      this.getTempBorder_teamCoach(that)
    }

    
    if(this.data.teamId!=2){  //车队 获取正式名额表单
      this.getMianBorder_team(that)
    }  
  },
  //点击按 教练搜索
  byCoach(){
    let that = this
    this.setData({
      byTime : false
    })  
    this.updateMycoach(this)

  },
  cancel(){
    let that = this
    wx.showModal({
      content: '您确定要撤销该预约吗？',
      success (res) {
        if (res.confirm) {
          appoin.cancel(that.data.successOrder.orderId)
          .then((res)=>{
            if(res.code==200){
              that.setData({
                success : false
              })
              wx.showToast({
                title: '撤销成功',
              })
              that.load(that)
            }
            if(res.code==800){
              that.setData({
                success : false
              })
              wx.showToast({
                title: '正在练习',
              })
              that.load(that)
            }
            if(res.code!=200&&res.code!=800){
              wx.showToast({
                title: '撤销失败',
                icon : 'none'
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },
  
  preventTouchMove(){
    
  },
  selectOrder(e){
    if(e.currentTarget.dataset.flag){
      this.setData({
        orderIndex : e.currentTarget.dataset.index
      })
    }
    
  },
  cmp_yes(){
    let orders = this.data.teamCoachs
    let index = this.data.orderIndex
    let coachId = orders[index].coachId
    let coachName = orders[index].username
    let car = orders[index].car
    let startTime = this.data.ordersStart
    let endTime = this.data.ordersEnd
    let orderType = 1   //正式名额
    this.appoint(this,coachName,coachId,car,startTime,endTime,orderType)
  },
  cmp_no(){
    this.setData({
      ifCmp : false
    })
  },
  //报名临时名额   时间搜索
  appoint_temp_time(e){
    let item = e.currentTarget.dataset.item
    let coachName = item.username
    let coachId = item.coach_id
    let car = item.nowcar
    let startTime = item.start_time
    let endTime =  item.end_time
    let orderType = 2  //临时名额
    if(item.flagTemp==1){
      this.appoint(this,coachName,coachId,car,startTime,endTime,orderType)
    }
  },
  //报名临时名额   教练搜索
  appoint_temp_coach(e){
    let item = e.currentTarget.dataset.item
    let coachName = this.data.myCoachs[this.data.myCoachsIndex].username
    let coachId = this.data.myCoachs[this.data.myCoachsIndex].coach_id
    let car = item.nowcar
    let startTime = item.start_time
    let endTime =  item.end_time
    let orderType = 2  //临时名额
    if(item.item.flagTemp==1&&item.isLeave!=1){
      this.appoint(this,coachName,coachId,car,startTime,endTime,orderType)
    }
  },
  

  //车队表单报名显示每个教练详情
  //教练搜索 正式名额报名
  appoint_team(event){
    if(this.data.byTime){
      let e = event.currentTarget.dataset
      if(e.flag==1){
        let startTime = this.data.dateArray[this.data.dateIndex] + ' ' + e.starttime
        let endTime = this.data.dateArray[this.data.dateIndex] + ' ' + e.endtime
        let project = this.data.projectIndex + 1
        let teamId = this.data.teamId
        appoin.content_team_coach(startTime,endTime,project,teamId)
          .then((res)=>{
            console.log(res)
            this.setData({
              teamCoachs : res.content,
              ifCmp : true,
              ordersStart : e.starttime,
              ordersEnd : e.endtime,
            })
            wx.pageScrollTo({
              scrollTop: 0,
              duration: 300
            })
          })
      }
    }
    if(!this.data.byTime){
      let item = event.currentTarget.dataset.item
      let coachName = this.data.myCoachs[this.data.myCoachsIndex].username
      let coachId = this.data.myCoachs[this.data.myCoachsIndex].coach_id
      let car = item.nowcar
      let startTime = item.start_time
      let endTime =  item.end_time
      let orderType = 1  //临时名额
      this.appoint(this,coachName,coachId,car,startTime,endTime,orderType)
    }
    
  },
  //单个教练 报名
  appoint_team_onecoach(event){
    let item = event.currentTarget.dataset.item
    console.log(item)
    if(item.isLeave==1){

    }else{
      let coachName = this.data.user.coachName
      let coachId = this.data.user.coachId
      let car = item.nowcar
      let startTime = item.start_time
      let endTime =  item.end_time
      let orderType = 1  //正式名额
      this.appoint(this,coachName,coachId,car,startTime,endTime,orderType)
    }
      
  },

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.load(this)

  },

  onShow: function () {
    
    wx.onSocketMessage((res)=>{
      console.log(res.data)
      if(res.data=="00"){
        this.setData({
          success : false
        })
        if(this.data.status==1){
          this.load(this)
        }
        else{
          let that = this
          let status = this.data.status
      
  
          if(this.data.teamId==2){      //单个教练 获取正式名额表单
            that.getMianBorder_teamCoach(that)
          }
        
          if(this.data.teamId!=2){    //车队 获取正式名额表单  和临时
            if(this.data.byTime){       //按时间搜索
              that.getMianBorder_team(that)
            }
            if(!this.data.byTime){       //按教练搜索
              this.updateMycoach(this)
            }
            if(status==2 && this.data.byTime){    //获取临时名额表单
              that.getTempBorder_teamCoach(that)
            }
          } 
        }
         
      }
    })  
  },  

  //按时间段搜索  获取正式名额  车队
  getMianBorder_team(that){ 
    let project = that.data.projectIndex+1
    let teamId = that.data.teamId
    let time = that.data.dateIndex
    appoin.content_team(time,project,teamId)
      .then((res)=>{
        console.log(res)
        if(res.code==200){
          that.setData({
            allforappoint : res.content,
            ifNull : false
          })
        }
        if(res.code==700){
          that.setData({
            allforappoint : [],
            tempforappoint : [],
            ifNull : true
          })
        }
        if(res.code!=200&&res.code!=700){
          wx.showToast({
            title: '加载失败',
            icon : 'none'
          })
        }
      })
  },

  //按教练搜索 获取   正式&&临时   表单车队
  getMianBorder_teamCoach(that){

    if(that.data.teamId==2){
      let coachId = wx.getStorageSync('user').coachId
      let project = that.data.projectIndex+1
      let flag = that.data.dateIndex
      appoin.count_coach(coachId,project,flag)
        .then((res)=>{
          console.log(res)
          if(res.code==200){
            that.setData({
              allforappoint : res.content,
              ifNull : false,
              // ordersEnd : false
            })
          }
          if(res.code==700){
            that.setData({
              allforappoint : [],
              tempforappoint : [],
              ifNull : true
            })
          }
          if(res.code!=200&&res.code!=700){
            wx.showToast({
              title: '加载失败',
              icon : 'none'
            })
          }
        })
    }
    else{
      if(that.data.myCoachs.length==0){
        that.setData({
          allforappoint : [],
        })
      }
      if(that.data.myCoachs.length!=0){
        let index = that.data.myCoachsIndex
        let coachId = that.data.myCoachs[index].coach_id
        let project = that.data.projectIndex+1
        let flag = that.data.dateIndex
        appoin.count_coach(coachId,project,flag)
          .then((res)=>{
            if(res.code==200){
              that.setData({
                allforappoint : res.content,
                ifNull : false,
                // ordersEnd : false
              })
            }
            if(res.code==700){
              that.setData({
                allforappoint : [],
                tempforappoint : [],
                ifNull : true
              })
            }
            if(res.code!=200&&res.code!=700){
              wx.showToast({
                title: '加载失败',
                icon : 'none'
              })
            }
          })
      }
    }
    
    
  },
 

  //获取车队临时名额  
  getTempBorder_teamCoach(that){
    let teamId = that.data.teamId
    let project = that.data.projectIndex+1
    let flag = that.data.dateIndex   //日期  date
    appoin.content_time_temp(teamId,project,flag)
      .then((res)=>{
        console.log(res)
        if(res.code==200){
          if(res.content[0].hasOwnProperty('start_time')){
            that.setData({
              tempforappoint : res.content
            })
          }
        }
        else{
          wx.showToast({
            title: '加载失败',
            icon : 'none'
          })
        }
      })
  },

  //预约啦  插入操作
  appoint(that,coachName,coachId,car,startTime,endTime,orderType){
    let studentId = that.data.user.roleId
    let start = that.data.dateArray[that.data.dateIndex] + ' ' + startTime
    let end = that.data.dateArray[that.data.dateIndex] + ' ' + endTime
    let subjectName = that.data.projects[that.data.projectIndex]
    let subject = that.data.projectIndex+1
    let deliText = startTime + '-' + endTime +"\r\n"+ coachName + '-' +that.data.carArray[car] + '-' + subjectName
    wx.showModal({
      title: '您确定要报名吗',
      content: deliText,
      success (res) {
        if (res.confirm) {
          appoin.doappoint(studentId,coachId,subject,car,start,end,orderType)
          .then((res)=>{
            console.log(res)
            wx.showLoading({
              title: '报名中...',
              mask : true
            })
            setTimeout(function () {
              wx.hideLoading()
            }, 1500)
            if(res.code==200){
              that.success(res,that,orderType)
              wx.hideLoading()
            }
            if(res.code==700){
              wx.showToast({
                title: '票被抢空',
                icon : 'none'
              })
            }
            if(res.code==701){
              wx.showToast({
                title: '添加失败',
                icon : 'none'
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },


  add0(n){
    return (n>9) ? n : '0' + n;
  },

  success(res,that,orderType){
    console.log("success")
    console.log(res)
    let start = new Date(res.content.order.orderStart)
    let end = new Date(res.content.order.orderEnd)
    let day = start.getDate()
    let month = start.getMonth()+1
    let startTimeHour = start.getHours()
    let startTimeMinutes = start.getMinutes()
    let endTimeHour = end.getHours()
    let endTimeMinutes = end.getMinutes()
    month = that.add0(month)
    day = that.add0(day)
    startTimeHour = that.add0(startTimeHour)
    endTimeHour = that.add0(endTimeHour)
    startTimeMinutes = that.add0(startTimeMinutes)
    endTimeMinutes = that.add0(endTimeMinutes)
    
    that.setData({
      success : true,
      ifCmp : false ,
      successOrder :{
        orderId : res.content.order.orderId,
        startTimeHour : startTimeHour,
        startTimeMinutes : startTimeMinutes,
        endTimeHour : endTimeHour,
        endTimeMinutes : endTimeMinutes,
        month : month ,
        day : day,
        weekIndex : start.getDay(),
        project : res.content.order.subject-1 ,
        carIndex : res.content.order.car,
        coachName : res.content.username,
        orderType : orderType   //1 正式名额  2临时名额
      },
    })
  },

  updateMycoach(that){
    appoin.getAllCoach(that.data.dateArray[that.data.dateIndex],that.data.teamId,that.data.projectIndex+1) 
      .then((res)=>{
        console.log(res)
        that.setData({
          myCoachs : res.content,
          myCoachsIndex : 0,
          myCoachsArray:[]
        })
        if(res.code==200){
          for(let i=0; i<res.content.length; i++){  
            that.setData({
              [`myCoachsArray[${i}]`] :res.content[i].username
            })
          }
        }
        if(res.code==705){
          // that.setData({
          //   myCoachsArray : []
          // })
        }
        that.getMianBorder_teamCoach(that)
      })
        
  },


  //下拉刷新
  onPullDownRefresh() {
    this.load(this)
    setTimeout(function () {
      wx.stopPullDownRefresh()
    }, 1000) 
   
  },

  load(that){
    let user = wx.getStorageSync('user')
    if(user.role==1){
      let teamId = wx.getStorageSync('teamId')
      this.setData({
        user : user,
        teamId : teamId
      })
      appoin.firstGo(user.roleId)   //获取
        .then((res)=>{
          if(res.code==200){
            console.log(res)
            let a = res.content
            if(a.status == 1){
              this.setData({
                success : true
              })
              that.success(res,that,res.content.order_type)
            }
            if(a.status != 1){
              this.setData({
                status : a.status,
                date : a.date,
                projectIndex : a.subject-1,
                'dateArray[0]':a.today,
                'dateArray[1]':a.tomorrow
              })

              if(teamId==2 ){    //没车队
                this.getMianBorder_teamCoach(this)
              }
              if(teamId!=2 ){    //有车队    获取表单名额
                  let that = this
                  if(a.status==2){     //获取临时名额
                    this.getTempBorder_teamCoach(that)
                  }
                  //获取正式名额
                  this.getMianBorder_team(that)
              }

            }
            
          }
        })
    }
    if(user.role!=1){
      wx.showToast({
        title: '您不是学员',
        icon : 'none'
      })
    }
  }

})