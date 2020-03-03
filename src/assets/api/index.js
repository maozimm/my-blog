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
const addViewsReq = function(params) {
  return axios.post('/addViews', params)
}
const getCommentReq = function(id, page) {
  return axios.get('/getComment', {
    params: {
      id,
      page
    }
  })
}
const getReplyReq = function(id) {
  return axios.get('/getReply', {
    params: {
      id
    }
  })
}
const addReplyReq = function(params) {
  return axios.post('/addReply', params)
}
const addCommetReq = function(params) {
  return axios.post('/addComment', params)
}
const getRecommendReq = function() {
  return axios.get('/getRecommendArticle')
}
const findUserReq = function(id) {
  return axios.get('/getUser/' + id)
}
const getCategoriesArticleReq = function(category, pageNum) {
  return axios.get('/getCategoryArticle', {
    params: {
      category,
      pageNum
    }
  })
}
const getUserArticleReq = function(userId, pageNum) {
  return axios.get('/getUserArticle', {
    params: {
      userId,
      pageNum
    }
  })
}
const checkPasswordReq = function(userId, password) {
  return axios.post('/checkPassword', {
    id: userId,
    password
  })
}
const modifyPasswordReq = function(userId, password) {
  return axios.post('/modifyPassword', {
    id: userId,
    password
  })
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
  modifyIsHotReq,
  addViewsReq,
  getCommentReq,
  getReplyReq,
  addReplyReq,
  addCommetReq,
  getRecommendReq,
  findUserReq,
  getCategoriesArticleReq,
  getUserArticleReq,
  checkPasswordReq,
  modifyPasswordReq
}
