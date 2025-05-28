<template>
  <div class="login-box p-4 bg-white ">
    <div class="logo-container">
      <img :src="logo" alt="Logo" width="150px"/>
    </div>
    <h2 class="mt-2 mb-4">Entrar</h2>

    <!-- Input Email com ícone User -->
    <div class="mb-3 position-relative">
      <UserRound class="input-icon" />
      <input
        type="email"
        class="form-control rounded-pill ps-5"
        id="email"
        placeholder="Digite seu email"
        v-model="email"
      >
    </div>

    <!-- Input Senha com ícone Lock -->
    <div class="mb-4 position-relative">
      <Lock class="input-icon" />
      <input
        type="password"
        class="form-control rounded-pill ps-5"
        id="password"
        placeholder="Digite sua senha"
        v-model="password"
      >
    </div>

    <!-- Botão de Login -->
    <router-link to="/dashboard" class="login-btn text-white btn w-100 rounded-pill py-2" @click="handleLogin">
      Entrar
    </router-link>

    <!-- Link para Esqueci a Senha -->
    <div class="text-center mt-3">
      <a href="#" class="text-decoration-none">Esqueci minha senha</a>
    </div>
  </div>
</template>

<script>
import logo from '@/assets/logo.svg'
import { UserRound, Lock } from 'lucide-vue-next'

export default {
  name: 'LoginBox',
  components: {
    UserRound,
    Lock
  },
  data() {
    return {
      email: '',
      password: '',
      logo: logo
    }
  },
  methods: {
    handleLogin() {
      // Lógica de login aqui
      console.log('Login attempt:', this.email, this.password)
    }
  }
}
</script>

<style scoped>
.login-btn{
  background-color: var(--primary);
  border: none;
  font-weight: 500;
  transition: all 0.3s;
}

.login-btn:hover {
  background-color: var(--primary-hover);
}

.logo-container{
  text-align: center;
}
.login-box {
  width: 35%;
  height: 100%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  float: right;
  border-radius: 0 25px 25px 0;
}

.input-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--primary);
  width: 20px;
  height: 20px;
  z-index: 10;
}

.form-control {
  padding-left: 40px !important;
  height: 45px;
}

.form-control:focus {
  border-color: #b486fe;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

a {
  color: var(--primary);
  font-size: 0.9rem;
}

a:hover {
  color: var(--primary-hover);
  text-decoration: underline;
}
</style>
