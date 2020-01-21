import axios from 'axios'

const loginReq = function(params) {
  return axios.get('/login', {
    params: params
  })
}
const registerReq = function(params) {
  return axios.post('/register', params)
}
const getUserReq = function(page, size) {
  return axios.get('/user', {
    params: {
      pageNum: page,
      pageSize: size
    }
  })
}
const modifyUserReq = function(id, data) {
  return axios.put('/user/' + id, data)
}
const deleteUserReq = function(id) {
  return axios.delete('/user/' + id)
}
const addUserReq = function(data) {
  return axios.post('/user', data)
}
const getCategoriesReq = function() {
  return axios.get('/category')
}
const getArticleReq = function() {
  return axios.get('/article')
}
export {
  loginReq,
  registerReq,
  getUserReq,
  modifyUserReq,
  deleteUserReq,
  addUserReq,
  getCategoriesReq,
  getArticleReq
}
