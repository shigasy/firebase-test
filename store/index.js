import firebase from '~/plugins/firebase'
const db = firebase.firestore()

const todoRef = db.collection('todos')

export const state = () => ({
  userUid: '',
  userName: '',
  todos: []
})

export const mutations = {
  setUserUid(state, userUid) {
    state.userUid = userUid
  },
  setUserName(state, userName) {
    state.userName = userName
  },
  addTodo(state, todo) {
    state.todos.push(todo)
  }
}

export const actions = {
  login({ commit }) {
    console.log('login action')
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const user = result.user
        commit('setUserUid', user.uid)
        commit('setUserName', user.displayName)
        console.log('success : ' + user)
      })
      .catch((error) => {
        const errorCode = error.code
        console.log('error : ' + errorCode)
      })
  },
  fetchTodos({ commit }) {
    todoRef
      .get()
      .then((res) => {
        res.forEach((doc) => {
          console.log('success : ' + `${doc.id} => ${doc.data()}`)
          commit('addTodo', doc.data())
        })
      })
      .catch((error) => {
        console.log('error : ' + error)
      })
  },
  addTodo({ commit }, todo) {
    todoRef
      .add({
        todo: todo.todo,
        limit: todo.limit
      })
      .then((docRef) => {
        console.log(docRef)
        commit('addTodo', todo)
      })
      .catch((error) => {
        console.log(`error: ${error}`)
      })
  }
}

export const getters = {
  getUserUid: (state) => state.userUid,
  getUserName: (state) => state.userName,
  getTodos: (state) => state.todos
}
