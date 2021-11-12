import {
  HTTP
} from '../utils/http.js'

class coach extends HTTP {
  getall(userId) {
      return this.request({
          url: "/coach/getAllCoachByMaster",
          method:"GET",
          data:{
            userId
          }
      })
  }

  delate(userId,coachId) {
    return this.request({
        url: "/coach/remCoachByMaster",
        method:"POST",
        data:{
          userId,
          coachId
        }
    })
}

}

export {
  coach
}