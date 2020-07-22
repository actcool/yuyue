// components/discuss/discuss.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    copy(e){
      if(e.target.dataset.ifcopy){
        wx.setClipboardData({
          data: e.target.dataset.data,
          success (res) {
            wx.getClipboardData({
              success (res) {
                console.log(res.data) // data
              }
            })
          }
        })
      }
    }
  }
})