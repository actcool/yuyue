import {
	coach
} from '../../models/myfleet'
const thecoach = new coach();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    roleId:'',
    teamId:'',
    ifcmp : false,  
    verify : '',      //输入车队名
    fleetName : '',   //车队名
    allcoach:'',      //车队所有教练
    allFindCoach:'',  //搜索结果
    inputValue : '',  //搜索内容
    showCoach : '',   //true显示教练  fasle显示创建车队
    showFindResult: false,   //显示搜索结果
    coachLength : '',
    ifcaptain: false ,

    // kong : true
  },

  
  inputCoach(e){     //搜索框 输入
    this.setData({
      inputValue : e.detail.value
    })
    if(e.detail.value.length==0){
      this.setData({
        allFindCoach:'',
        showFindResult: false
      })
      thecoach.getall(this.data.roleId)
      .then((res)=>{
        if(res.code==200){
          this.setData({
            allcoach : res.content,
            coachLength : res.content.length,
          })
        }
        if(res.code!=200){
          wx.showToast({
            title: '出错啦,刷新试试吧~',
            icon : 'none',
            duration : 2000
          })
        }
        
      })
    }
  },
  search(){
    thecoach.search(this.data.inputValue,this.data.roleId)
      .then((res)=>{
        if(res.code==200){
          if(res.content){
            wx.showToast({
              title: '查询结果空~~',
              icon : 'none',
              duration : 2000
            })
          }
          this.setData({
            allFindCoach:res.content,
            showFindResult : true
          })
        }
        if(res.code!=200){
          wx.showToast({
            title: '搜索失败',
            icon : 'none',
          })
        }
        
      })
  },
  cls(){    //搜索框拔插
    this.setData({
      inputValue : '',
      allFindCoach:'',
      showFindResult: false
    })
    thecoach.getall(this.data.roleId)
      .then((res)=>{
        this.setData({
          allcoach : res.content,
          coachLength : res.content.length,
        })
      })
  },
  create(){   //创建车队
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
    let that = this
    this.setData({
      ifcmp : false,
      verify : e.detail.verify
    })
    thecoach.create(this.data.roleId,e.detail.verify)
      .then((res)=>{
        console.log(this.data.roleId)
        console.log(e.detail.verify)
        console.log(res)
        if(res.code==200){
          wx.showToast({
            title: '创建成功',
            icon : 'none'
          }),
          this.setData({
            showCoach : true,
            teamId : res.content
          })
          wx.setStorage({
            data: res.content,
            key: 'teamId',
          })
          thecoach.getall(that.data.roleId)
            .then((res)=>{
              if(that.data.roleId==res.content[0].captain){
                that.setData({ 
                  ifcaptain : true
                })
              }
              that.setData({ 
                allcoach : res.content,
                coachLength : res.content.length
              })
            })
        }
        else{
          wx.showToast({
            title: '操作失败',
            icon : 'none'
          })
        }
      })
  },
  delateCoach(event){
    let e = event.currentTarget.dataset
    let that = this
    if(e.flag||e.flag==3){
      wx.showModal({
        content: '您确定要将'+e.name+'移出车队吗？',
        success (res) {
          if (res.confirm) {
            thecoach.cancel(that.data.roleId,e.coachid)
            .then((res)=>{
              console.log(res)
              if(res.code==200){
                if(e.delatewhich=="allcoach"){
                  let arr = that.data.allcoach
                  arr.splice(e.index,1) 
                  that.setData({
                    allcoach : arr
                  })
                }
                if(e.delatewhich=="allFindCoach"){
                  let arr = that.data.allFindCoach
                  arr[e.index].flag = 1
                  that.setData({
                    allFindCoach : arr
                  })
                }
                
                wx.showToast({
                  title: '操作成功',
                  icon : 'success'
                })
              }
              else{
                wx.showToast({
                  title: '操作失败',
                  icon : 'none'
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
  addCoach(event){
    let e = event.currentTarget.dataset
    let that = this
      wx.showModal({
        content: '您确定要将'+e.name+'加入车队吗？',
        success (res) {
          if (res.confirm) {
            console.log(that.data.teamId)
            thecoach.add(e.coachid,that.data.teamId)
              .then((res)=>{
                if(res.code==200){
                  let arr = that.data.allFindCoach
                  arr[e.index].flag=3 
                  that.setData({
                    allFindCoach : arr
                  })
                }else{
                  wx.showToast({
                    title: '操作失败',
                    icon : 'none'
                  })
                }
                console.log(res)
              })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
  },

  jiesan(){
    let that = this
    wx.showModal({
      content: '您确定要解散车队吗？',
      success (res) {
        if (res.confirm) {
          thecoach.dissolution(that.data.teamId,that.data.roleId)
            .then((res)=>{
              console.log(res)
              if(res.code==200){
                wx.setStorage({
                  data: '2',
                  key: 'teamId',
                })
                wx.showToast({
                  title: '解散成功',
                  icon : 'success'
                })
                wx.setStorage({
                  data: '2',
                  key: 'teamId',
                })
                setTimeout(funcName,2000);
                function funcName() {
                  wx.navigateBack({
                    delta: 1
                  })
                } 
                
              }else{
                wx.showToast({
                  title: '操作失败',
                  icon:'none'
                })
              }
            })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  out(){
    let that = this
    wx.showModal({
      content: '您确定要退出车队吗?',
      success (res) {
        if (res.confirm) {
          thecoach.cancel(that.data.roleId,that.data.roleId)
          .then((res)=>{
            console.log(res)
            if(res.code==200){
              wx.showToast({
                title: '操作成功',
                icon:'success'
              })
              wx.setStorage({
                data: '2',
                key: 'teamId',
              })
              setTimeout(funcName,2000);
              function funcName() {
                wx.navigateBack({
                  delta: 1
                })
              } 
            }
            else{
              wx.showToast({
                title: '操作失败',
                icon:'none'
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

    
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let user = wx.getStorageSync('user')
    let roleId = user.roleId
    let teamId = wx.getStorageSync('teamId')
    let that = this
    this.setData({
      roleId : roleId,
      teamId : teamId
    })
    
    if(teamId==2){
      this.setData({
        showCoach : false
      })
    }
    else{
      this.setData({
        showCoach : true
      })
      console.log('res')
      thecoach.getall(roleId)
        .then((res)=>{
          if(roleId==res.content[0].captain){
            that.setData({ 
              ifcaptain : true
            })
          }
          console.log('res')
          console.log(res)
          that.setData({ 
            allcoach : res.content,
            coachLength : res.content.length
          })
        })
      }
  },

  onPullDownRefresh(){
    let user = wx.getStorageSync('user')
    let roleId = user.roleId
    let teamId = wx.getStorageSync('teamId')
    let that = this
    this.setData({
      roleId : roleId,
      teamId : teamId
    })
    
    if(teamId==2){
      this.setData({
        showCoach : false
      })
    }
    else{
      this.setData({
        showCoach : true
      })
      console.log('res')
      thecoach.getall(roleId)
        .then((res)=>{
          if(roleId==res.content[0].captain){
            that.setData({ 
              ifcaptain : true
            })
          }
          console.log('res')
          console.log(res)
          that.setData({ 
            allcoach : res.content,
            coachLength : res.content.length
          })
        })
      }
      setTimeout(function () {
        wx.stopPullDownRefresh()
      }, 1200)
  },

  

})