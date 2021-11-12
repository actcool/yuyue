//app.js
App({
  globalData: {
    ifSocket: false,
    role : '',
    carArray : ['红一','红二','红三','红四','红五','红六','红七'] ,
    project:['待定','倒车入库','跑圈','科目二','科目三']
  },
  onLaunch: function () {
    this.setWatcher(this.globalData,this.watch)
    let user = wx.getStorageSync("user")
    this.globalData.role = user.role
    if(user.hasOwnProperty('userid')){
      setTimeout(funcName,1000);
      function funcName() {
        console.log("userId :"+user.userid)
        wx.connectSocket({
          url: 'wss://www.xieyawei.top:8443/weixin/ws/'+user.userid,
          data:{
          },
          header:{
          },
          protocols: [],
          method:"GET",
          success (res) {
            console.log(res)
          },
        })
      }
      
    }

    wx.onSocketClose((res)=>{
      let user = wx.getStorageSync("user")
      if(user.userid== undefined){
        console.log("长连接已断开,暂不重连")
      }
      else{
        console.log("长连接已断开,15秒后再一次连接")
        setTimeout(funcName,15000);
        function funcName() {
          wx.connectSocket({
            url: 'wss://www.xieyawei.top:8443/weixin/ws/'+user.userid,
            data:{
            },
            header:{
            },
            protocols: [],
            method:"GET",
            success (res) {
              console.log(res)
            },
          })
        }
      }
      
      
    })

    
    







    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  /**
   * 设置监听器
   */
  setWatcher(data, watch) { // 接收index.js传过来的data对象和watch对象
    Object.keys(watch).forEach(v => { // 将watch对象内的key遍历
        this.observe(data, v,watch[v]); // 监听data内的v属性，传入watch内对应函数以调用
    })
  },
  /**
   * 监听属性 并执行监听函数
  */
  observe(obj, key,watchFun) {
    var val = obj[key]; // 给该属性设默认值
    Object.defineProperty(obj, key, {
        configurable: true,
        enumerable: true,
        set: function(value) {
            val = value;
            watchFun(value,val); // 赋值(set)时，调用对应函数
        },
        get: function() {
            return val;
        }
    })
  },

  watch:{
    ifSocket:function(ifSocket){
      console.log("监听ifSocket为"+ifSocket)
      if(ifSocket){
        let user = wx.getStorageSync("user")
        console.log(user.userid)
        wx.connectSocket({
          url: 'wss://www.xieyawei.top:8443/weixin/ws/'+user.userid,
          data:{
          },
          header:{
          },
          protocols: [],
          method:"GET",
          success (res) {
            console.log(res)
          },
        })
      }
    }
  },

  
})