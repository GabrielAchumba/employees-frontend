import axios from 'axios' 
const envVariable = "production"
const $http  = axios.create({ 
    baseURL: envVariable === "production" ? 'https://employees-backend.vercel.app/' : 'http://localhost:4000/', //'https://jsonplaceholder.typicode.com/',
    headers: {'Content-Type': 'application/json'},
})

export { $http  }
