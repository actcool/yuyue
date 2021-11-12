import {
  HTTP
} from '../utils/http.js'

class coach extends HTTP {
  getall(coachId) {
      return this.request({
          url: "/coach/allCoach",
          method:"GET",
          data:{
            coachId
          }
      })
  }

  create(coachId,teamName) {
    return this.request({
        url: "/team/saveTeam",
        method:"POST",
        data:{
          coachId,
          teamName
        }
    })
  }

  search(content,coachId) {
    return this.request({
        url: "/coach/selectCoach",
        method:"GET",
        data:{
          content,
          coachId
        }
    })
  }

  cancel(fromCoachId,toCoachId) {
    return this.request({
        url: "/team/remCoachByTeam",
        method:"POST",
        data:{
          fromCoachId,
          toCoachId
        }
    })
  }
  add(toCoachId,teamId) {
    return this.request({
        url: "/team/addTeam",
        method:"POST",
        data:{
          toCoachId,
          teamId
        }
    })
  }

  dissolution(teamId,coachId) {
    return this.request({
        url: "/team/remTeam",
        method:"POST",
        data:{
          teamId,
          coachId
        }
    })
  }


}

export {
  coach
}