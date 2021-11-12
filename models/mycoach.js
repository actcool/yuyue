import {
  HTTP
} from '../utils/http.js'

class coach extends HTTP {
  getall(coachId) {
      return this.request({
          url: "/coach/getMyCoachs",
          method:"GET",
          data:{
            coachId
          }
      })
  }

}

export {
  coach
}