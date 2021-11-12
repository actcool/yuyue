import {
  HTTP
} from '../utils/http.js'

class leave extends HTTP {
  getAll(coachId) {
    return this.request({
        url: "/leave/getLeave",
        method:"GET",
        data:{
          coachId
        }
    })
  }
  submit(leaveId,coachId,startTime,endTime,content) {
      return this.request({
          url: "/leave/addLeave",
          method:"POST",
          data:{
            leaveId,
            coachId,
            startTime,
            endTime,
            content,
            
          }
      })
  }

  cancel(leaveId){
    return this.request({
        url: "/leave/cancel",
        method:"POST",
        data:{
          leaveId
        }
    })
  }

}

export {
  leave
}