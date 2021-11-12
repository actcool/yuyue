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
    verify:'',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    no(){
      this.triggerEvent('no',{ifcmp:false, verify:this.data.verify})
    },
    yes(){
      this.triggerEvent('yes',{ifcmp:false, verify:this.data.verify})
    },
    cmpInput(e){
      this.setData({
        verify:e.detail.value
      })
    }
  }
})