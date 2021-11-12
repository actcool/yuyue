import {
  HTTP
} from '../utils/http.js'

class user_detail extends HTTP {

  change(userId,flag,content) {
      return this.request({
          url: "/userInfo/updateUserInfo",
          method:"POST",
          data:{
            userId,
            flag,
            content
          }
      })
  }

}

export {
  user_detail
}