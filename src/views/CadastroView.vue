<template>
  <div class="cadastro-view">
    <router-view/>
  </div>
</template>

<script>

// imports

export default {
  name: 'CadastroView',
  components: {
    //nome dos componentes importados
  }
}
</script>

<style scoped>
.login-view {
  display: flex;
  justify-content: center;
  margin: 0;
  position: relative; /* Adicione isso para servir como referência para o posicionamento absoluto */
}
</style>
