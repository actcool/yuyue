import {
  HTTP
} from '../utils/http.js'

class QrCode extends HTTP {
  showCode(userid) {
      return this.request({
          url: "/qrcode/code",
          method:"GET",
          data:{
            userid
          }
      })
  }

  Refresh(userId) {
    return this.request({
        url: "/getUserInfo",
        method:"GET",
        data:{
          userId
        }
    })
}

}

export {
  QrCode
}