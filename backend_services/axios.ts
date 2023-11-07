import axios from 'axios' 

const $http  = axios.create({ 
    baseURL: 'http://localhost:4000/', //'https://jsonplaceholder.typicode.com/',
    headers: {'Content-Type': 'application/json'},
})

export { $http  }
