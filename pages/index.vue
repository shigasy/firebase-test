<template>
  <div class="container">
    <p>User: {{ $store.getters.getUserName }}</p>
    <button @click="login">
      ログイン
    </button>
  </div>
</template>
<script>
export default {
  methods: {
    login() {
      console.log('login')
      this.$store.dispatch('login')
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
