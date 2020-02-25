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
const getArticleReq = function(category, state, page, size) {
  return axios.get('/article', {
    params: {
      category: category,
      state: state,
      pageNum: page,
      pageSize: size
    }
  })
}
const addArticleReq = function(params) {
  return axios.post('/addArticle', params)
}
const getHotArticleReq = function(pageNum, pageSize) {
  return axios.get('/getHotArticle', {
    params: {
      pageNum,
      pageSize
    }
  })
}
const findArticleReq = function(id) {
  return axios.get('/findArticle/' + id)
}
const modifyArticleReq = function(id, params) {
  return axios.put('/modifyArticle/' + id, params)
}
const deleteArticleReq = function(id) {
  return axios.delete('/deleteArticle/' + id)
}
const modifyIsHotReq = function(id, isHot) {
  return axios.put('/modifyIsHot/' + id, isHot)
}
export {
  loginReq,
  registerReq,
  getUserReq,
  modifyUserReq,
  deleteUserReq,
  addUserReq,
  getCategoriesReq,
  getArticleReq,
  addArticleReq,
  getHotArticleReq,
  findArticleReq,
  modifyArticleReq,
  deleteArticleReq,
  modifyIsHotReq
}
