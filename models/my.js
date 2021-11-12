import {
    HTTP
} from '../utils/http.js'

class My extends HTTP {
    login(code,iv,encryptedData) {
        return this.request({
            url: "/wxLogin",
            method:"POST",
            data:{
                code,
                iv,
                encryptedData
            }
        })
    }

    getall() {
        return this.request({
            url: "/coach/getAllCoachByMaster",
            method:"GET",
            data:{
              
            }
        })
    }
    
    Refresh(userId) {
        return this.request({
            url: "/getUserInfo",
            method:"GET",
            data:{
              userId
            }
        })
    }
  
}

export {
    My
}