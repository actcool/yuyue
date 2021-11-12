import {
  HTTP
} from '../utils/http.js'

class scan extends HTTP {
  showSb(userId){
    return this.request({
        url: "/userInfo/select",
        method:"GET",
        data:{
          userId
        }
      })
    }
  doit(fromUserId,fromIdentity,toUserId,toIdentity,item) {
      return this.request({
          url: "/qrcode/identity",
          method:"GET",
          data:{
            fromUserId,
            fromIdentity,
            toUserId,
            toIdentity,
            item
          }
      })
  }

}

export {
  scan
}