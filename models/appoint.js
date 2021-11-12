import {
  HTTP
} from '../utils/http.js'

class appointModel extends HTTP {

  //页面加载
  firstGo(studentId)  {
    return this.request({
        url: "/order/getTime",
        method:"GET",
        data:{
          studentId
        }
    })
  }


  //获取车队表单    //循环
  // content_team(startTime,endTime,subject,teamId)  {
  //   return this.request({
  //       url: "/order/getCount",
  //       method:"POST",
  //       data:{
  //         startTime,
  //         endTime,
  //         subject,
  //         teamId
  //       }
  //   })
  // }                           
  //直接获取
  content_team(flag,subject,teamId)  {
    return this.request({
        url: "/order/getAllCount",
        method:"GET",
        data:{
          flag,
          subject,
          teamId
        }
    })
  }

  //按教练搜索  获取正式名额表单
  count_coach(coachId,subject,flag)  {
    return this.request({
        url: "/order/getAllCountByCoachId",
        method:"GET",
        data:{
          coachId,
          subject,flag
        }
    })
  }


  //获取车队所有教练表单
  content_team_coach(startTime,endTime,subject,teamId)  {
    return this.request({
        url: "/order/getCoachByTeam",
        method:"GET",
        data:{
          startTime,
          endTime,
          subject,
          teamId
        }
    })
  }

  //获取车队所有教练
  getAllCoach(time,teamId,subject){
    return this.request({
      url: "/order/getAllCoachByTime",
      method:"GET",
      data:{
        time,
        teamId,
        subject
      }
    })
  }
  //获取车队某一教练 正式名额表单
  content_team_coach(time,subject,coachId){
    return this.request({
      url: "/order/getCoachByTeam",
      method:"GET",
      data:{
        time,
        teamId,
        subject
      }
    })
  }

  //获取单干教练表单
  // content_coach(startTime,endTime,subject,teamId){
  //   return this.request({
  //     url: "/order/getCoachByTeam",
  //     method:"GET",
  //     data:{
  //       startTime,
  //       endTime,
  //       subject,
  //       teamId
  //     }
  //   })
  // }

  content_team_coach(startTime,endTime,subject,teamId){
    return this.request({
      url: "/order/getCoachByTeam",
      method:"GET",
      data:{
        startTime,
        endTime,
        subject,
        teamId
      }
    })
  }

    //按时间段搜索  获取临时名额
  content_time_temp(teamId,subject,flag){
    return this.request({
      url: "/order/getAllTempCountByTime",
      method:"GET",
      data:{
        teamId,
        subject,
        flag
      }
    })
  }

    //按时间段搜索  获取临时名额
    content_time_temp(teamId,subject,flag){
      return this.request({
        url: "/order/getAllTempCountByTime",
        method:"GET",
        data:{
          teamId,
          subject,
          flag
        }
      })
    }

  //预约啦  插入操作
  doappoint(studentId,coachId,subject,car,startTime,endTime,orderType){
    return this.request({
      url: "/order/bookOrder",
      method:"POST",
      data:{
        studentId,
        coachId,
        subject,
        car,
        startTime,
        endTime,
        orderType
      }
    })
  }

  cancel(orderId){
    return this.request({
      url: "/order/cancelOrder",
      method:"PUT",
      data:{
        orderId
      }
    })
  }
  
}

export {
  appointModel
}