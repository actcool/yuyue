import {
  HTTP
} from '../utils/http.js'

class doPlan extends HTTP {
  doPlan(coachId) {
      return this.request({
          url: "/coach/getInfo",
          method:"GET",
          data:{
            coachId
          }
      })
  }
  submit(coachId,subject,car,content,startTime,endTime){
    return this.request({
      url: "/coach/updateInfo",
      method:"POST",
      data:{
        coachId,
        subject,
        car,
        content,
        startTime,
        endTime
      }
    })
  }

}

export {
  doPlan
}