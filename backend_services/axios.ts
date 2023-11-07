import axios from 'axios' 
const envVariable = "development"
const $http  = axios.create({ 
    baseURL: envVariable === "production" ? 'https://employeemgt-f61186568148.herokuapp.com/' : 'http://localhost:4000/', //'https://jsonplaceholder.typicode.com/',
    headers: {'Content-Type': 'application/json'},
})

export { $http  }
