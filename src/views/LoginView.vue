<template>
  <div class="login-view">
    <CardBox>
        <LoginBox>
        </LoginBox>
    </CardBox> 
  </div>
</template>

<script>
import CardBox from '@/components/CardBox.vue'
import LoginBox from '@/components/LoginBox.vue'

export default {
  name: 'LoginView',
  components: {
    CardBox,
    LoginBox
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