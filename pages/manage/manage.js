import {
	coach
} from '../../models/manage'
const thecoach = new coach();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    allcoach:'',
    userid : ''
  },

  delate(e){
    let that = this
    let userId = this.data.userid
    wx.showModal({
      title: '提示',
      content: "确定将"+e.currentTarget.dataset.name+"删除吗？",
      success (res) {
        if (res.confirm) {
          thecoach.delate(userId,e.currentTarget.dataset.coachid)
            .then((res)=>{
              console.log(res)
              if(res.code==200){
                let arr = that.data.allcoach
                arr.splice(e.currentTarget.index,1) 
                that.setData({
                  allcoach : arr
                })
                wx.showToast({
                  title: '删除成功',
                  icon:'success'
                })
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
    thecoach.getall(user.userid)
      .then((res)=>{
        console.log(res)
        this.setData({
          allcoach : res.content,
          userid : user.userid
        })
      })
  },

  
  onPullDownRefresh() {
    let user = wx.getStorageSync('user')
    thecoach.getall(user.userid)
      .then((res)=>{
        console.log(res)
        this.setData({
          allcoach : res.content,
          userid : user.userid
        })
      })
      setTimeout(function () {
        wx.stopPullDownRefresh()
      }, 1200)
  },
})