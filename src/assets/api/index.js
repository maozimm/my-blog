import axios from 'axios'

const loginReq = function (params) {
  return axios.get('/login', {
    params: params
  })
}
const registerReq = function (params) {
  return axios.post('/register', params)
}
export { loginReq, registerReq }
