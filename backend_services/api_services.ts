import { $http } from "./axios";

export const sessionKey = "seassionObj";

export const get = async (url:string) => {

  var { token } = validateSession();
  $http.defaults.headers.common['authorization'] = 'bearer ' + token;
  console.log("token")
  
    return new Promise((resolve, reject) => {
        
      $http.get(url)
       .then(response => {            
           resolve(response)
           
       })
       .catch(error => {
         reject(error)
       })
    })
}

export const post = (payload:any) => {

  return new Promise((resolve, reject) => {
      
    $http.post(payload.url, payload.req)
     .then(response => {             
         resolve(response)
         
     })
     .catch(error => {
       reject(error)
     })
 })
}


const validateSession = () => {
  let seassionVal = sessionStorage.getItem(sessionKey);
  if (seassionVal !== null) {
    let sessionObj = JSON.parse(seassionVal);
    let expiredAt = new Date(sessionObj.expiredAt);
    if (expiredAt > new Date()) { // Validate expiry date.
      return sessionObj.value;
    } else {
      sessionStorage.removeItem(sessionKey);
    }
  }
    return null;
}