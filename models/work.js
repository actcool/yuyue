import {
  HTTP
} from '../utils/http.js'

class Work extends HTTP {

  onLoad(coachId){
    return this.request({
        url: "/order/getCoachInfo",
        method:"GET",
        data:{
          coachId
        }
    })
  }

  getDetail(coachId,startTime,endTime){
    return this.request({
        url: "/order/getOrderListByCoach",
        method:"GET",
        data:{
          coachId,
          startTime,
          endTime
        }
    })
  }

  //修改临时名额
  changeTemp(coachId,startTime,endTime,count){
    return this.request({
        url: "/coach/updateTemp",
        method:"POST",
        data:{
          coachId,
          startTime,
          endTime,
          count
        }
    })
  }

  //确认
  confirm(orderId){
    return this.request({
        url: "/order/update",
        method:"POST",
        data:{
          orderId
        }
    })
  }

}

export {
  Work
}