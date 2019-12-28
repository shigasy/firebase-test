<template>
  <div class="container">
    <p>User: {{ $store.getters.getUserName }}</p>
    <button @click="login">
      ログイン
    </button>
    <table class="table is-narrow">
      <tbody>
        <tr>
          <th>todo</th>
          <th>limit</th>
        </tr>
      </tbody>
      <tbody>
        <tr v-for="todo in $store.getters.getTodos" :key="todo.id">
          <td>{{ todo.todo }}</td>
          <td>{{ todo.limit }}</td>
        </tr>
      </tbody>
    </table>
    <div class="field is-grouped">
      <p class="control is-expanded">
        <input v-model="newTodo" class="input" type="text" placeholder="todo" />
      </p>
      <p class="control is-expanded">
        <input
          v-model="newLimit"
          class="input"
          type="text"
          placeholder="limit"
        />
      </p>
      <p class="control">
        <a @click="addTodo" class="button is-primary">
          add
        </a>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      newTodo: '',
      newLimit: ''
    }
  },
  created() {
    this.$store.dispatch('fetchTodos')
  },
  methods: {
    login() {
      console.log('login')
      this.$store.dispatch('login')
    },
    addTodo() {
      const todo = this.newTodo
      const limit = this.newLimit
      this.$store.dispatch('addTodo', { todo, limit })
      this.newTodo = ''
      this.newLimit = ''
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
