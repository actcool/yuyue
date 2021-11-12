import {
  HTTP
} from '../utils/http.js'

class feedBack extends HTTP {
  submit(userId,content) {
      return this.request({
          url: "/suggestion/addSuggestion",
          method:"POST",
          data:{
            userId,
            content
          }
      })
  }
  getall(userId)  {
    return this.request({
        url: "/suggestion/getSuggestion",
        method:"GET",
        data:{
          userId
        }
    })
  }
  
}

export {
  feedBack
}