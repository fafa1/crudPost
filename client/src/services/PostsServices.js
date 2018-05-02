import Api from '@/services/Api'

export default {
  fetchPosts () {
    return Api().get('posts')
  },

  addPost(params) { // ver esses parametros
    return Api().post('posts', params)
  },
  updatePost(params){
    return Api().put('posts/' + params.id, params)
  },
  getPost(params){
    return Api().get('post/' + params.id)  //conexao com o app.js no server
  },
  deletePost(id){
    return Api().delete('posts/' + id)
  }

}

