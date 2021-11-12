import {
  HTTP
} from '../utils/http.js'

class state extends HTTP {
  getall(studentId) {
      return this.request({
          url: "/order/getMyOrder",
          method:"GET",
          data:{
            studentId
          }
      })
  }
  cancel(orderId,status) {
    return this.request({
      url: "/order/update",
      method:"POST",
      data:{
        orderId,
        status
      }
    })
  }

}

export {
  state
}