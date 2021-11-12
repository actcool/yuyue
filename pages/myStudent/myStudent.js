import {
	MyStudents
} from '../../models/myStudent.js'
const myStudents = new MyStudents();


Page({

  data: {
    teamId : '',
    user : '',

    allStudent:'',
    userid : '',
    inputValue : '' ,
    showCoach : [],
    kong : true,
    
  },

 
  cls(){    //搜索框拔插
    wx.showLoading({
      title: '加载中...',
      mask : true
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 1000)
    this.setData({
      inputValue : ''
    })
    myStudents.search(this.data.inputValue,this.data.teamId,this.data.user.roleId)
      .then((res)=>{
        if(res.code==200){
          this.setData({
            allStudent : res.content,
          })
          if(res.content.length==0){
            this.setData({
              kong : true
            })
          }else{
            this.setData({
              kong : false
            })
          }
          this.makeArray(res.content,this)
        }
        else{
          wx.showToast({
            title: '加载失败',
            icon : 'none'
          })
        }
      })
  },

  search(){
    wx.showLoading({
      title: '加载中...',
      mask : true
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 3000)
    myStudents.search(this.data.inputValue,this.data.teamId,this.data.user.roleId)
      .then((res)=>{
        if(res.code==200){
          wx.hideLoading()
          this.setData({
            allStudent : res.content
          })
          if(res.content.length==0){
            this.setData({
              kong : true
            })
          }else{
            this.setData({
              kong : false
            })
          }
          this.makeArray(res.content,this)
        }
        else{
          wx.showToast({
            title: '加载失败',
            icon : 'none'
          })
        }
      })
  },

  inputCoach(e){     //搜索框 输入
    this.setData({
      inputValue : e.detail.value
    })
    
  },

  delete(e){
    let that = this
    let flag = e.currentTarget.dataset.flag
    let studentId = e.currentTarget.dataset.studentid
    let name = e.currentTarget.dataset.name
    let index = e.currentTarget.dataset.index
    if(flag==1){
      wx.showModal({
        content: '您确定将'+name+'移除车队吗？',
        success (res) {
          if (res.confirm) {
            myStudents.delete(studentId,that.data.user.roleId)
            .then((res)=>{
              console.log(res)
              if(res.code==200){
                wx.showToast({
                  title: '删除成功',
                })
                let arr = that.data.allStudent
                arr.splice(index,1) 
                that.setData({
                  allStudent : arr
                })
                if(arr.length==0){
                  this.setData({
                    kong : true
                  })
                }
              }
              else{
                wx.showToast({
                  title: '删除失败',
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

  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
      mask : true
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
    let teamId = wx.getStorageSync('teamId')
    let user = wx.getStorageSync('user')
    this.setData({
      teamId:teamId,
      user:user
    })
    myStudents.getAll(teamId,user.roleId)
      .then((res)=>{
        console.log(res)
        if(res.code==200){
          wx.hideLoading()
          this.setData({
            allStudent : res.content
          })
          if(res.content.length==0){
            this.setData({
              kong : true
            })
          }
          else{
            this.setData({
              kong : false
            })
          }
          this.makeArray(res.content,this)
        }
        else{
          wx.showToast({
            title: '加载失败',
            icon : 'none'
          })
        }
      })
  },


  makeArray(array,that){
    for(let i=0,j=0 ; i<array.length ; i++){
      if(i==0){
        that.setData({
          [`showCoach[${i}]`] : true
        })
      }
      if(i>0 && array[i].default_coach!=array[i-1].default_coach){
        that.setData({
          [`showCoach[${i}]`] : true
        })
      }
      
    }
  },


  onPullDownRefresh(){
    wx.showLoading({
      title: '加载中...',
      mask : true
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
    let teamId = wx.getStorageSync('teamId')
    let user = wx.getStorageSync('user')
    this.setData({
      teamId:teamId,
      user:user
    })
    myStudents.getAll(teamId,user.roleId)
      .then((res)=>{
        console.log(res)
        if(res.code==200){
          wx.hideLoading()
          this.setData({
            allStudent : res.content
          })
          if(res.content.length==0){
            this.setData({
              kong : true
            })
          }
          else{
            this.setData({
              kong : false
            })
          }
          this.makeArray(res.content,this)
        }
        else{
          wx.showToast({
            title: '加载失败',
            icon : 'none'
          })
        }
      })
      wx.stopPullDownRefresh()
    },

  

})