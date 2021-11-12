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
    carArray :['红一','红二','红三','红四','红五','红六','红七','红八','红九','红十','红十一','红十二','蓝一','蓝二','蓝三','蓝四','蓝五','蓝六','蓝七','蓝八','蓝九','蓝十','蓝十一','蓝十二'] ,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    no(){
      this.triggerEvent('no',{ifcmp:false})
    }
  }
})