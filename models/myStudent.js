import {
  HTTP
} from '../utils/http.js'

class MyStudents extends HTTP {
  getAll(teamId,coachId){
    return this.request({
        url: "/coach/getStudentOfCoach",
        method:"GET",
        data:{
          teamId,
          coachId
        }
      })
    }

  search(condition,teamId,coachId){
    return this.request({
      url: "/coach/getStudentBySearch",
      method:"GET",
      data:{
        condition,
        teamId,
        coachId
      }
    })
  }

  delete(studentId,coachId){
    return this.request({
      url: "/coach/deleteStudent",
      method:"DELETE",
      data:{
        studentId,
        coachId
      }
    })
  }
  

}

export {
  MyStudents
}