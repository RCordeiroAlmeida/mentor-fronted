<template>
  <form @submit.prevent="handleSubmit" class="pacientes-form">
    <div class="form-group">
      <label for="nome">Nome:</label>
      <input
        type="text"
        id="nome"
        v-model="cliente.nome"
        placeholder="Digite o nome do cliente"
        required
      />
    </div>

    <div class="form-group">
      <label for="email">Email:</label>
      <input
        type="email"
        id="email"
        v-model="cliente.email"
        placeholder="Digite o email do cliente"
        required
      />
    </div>

    <div class="form-group">
      <label for="telefone">Telefone:</label>
      <input
        type="tel"
        id="telefone"
        v-model="cliente.telefone"
        placeholder="Digite o telefone do cliente"
      />
    </div>

    <div class="form-group">
      <label for="cpf">CPF:</label>
      <input
        type="text"
        id="cpf"
        v-model="cliente.cpf"
        placeholder="Digite o CPF"
      />
    </div>

    <button type="submit">Cadastrar Cliente</button>
  </form>
</template>

<script setup>
import { reactive } from 'vue'

// Objeto reativo para armazenar os dados do cliente
const cliente = reactive({
  nome: '',
  email: '',
  telefone: '',
  cpf: ''
})

// Função chamada ao enviar o formulário
const handleSubmit = () => {
  // Aqui você pode enviar os dados para a API, por exemplo
  console.log('Cliente cadastrado:', cliente)

  // Resetando o formulário
  cliente.nome = ''
  cliente.email = ''
  cliente.telefone = ''
  cliente.cpf = ''
}
</script>

<style scoped>
.pacientes-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 400px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

input {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  padding: 10px;
  border-radius: 4px;
  border: none;
  background-color: #e63946;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #d62828;
}
</style>
