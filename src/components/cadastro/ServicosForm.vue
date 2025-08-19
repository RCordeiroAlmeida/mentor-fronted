<template>
  <div class="d-flex">
    <div class="profissionais-form flex-grow-1">
      <form @submit.prevent="handleSubmit" class="p-3">
        <!-- Nome do serviço -->
        <div class="form-group mb-3">
          <input
            type="text"
            class="form-control rounded-pill"
            placeholder="Nome do serviço"
            v-model="servico.name"
            required
          />
        </div>

        <!-- Descrição -->
        <div class="form-group mb-3">
          <textarea
            class="form-control rounded"
            placeholder="Descrição: (como funciona)"
            v-model="servico.descricao"
            rows="3"
          ></textarea>
        </div>

        <!-- Botão de submit -->
        <button type="submit" class="btn btn-custom-primary rounded-pill w-100">Cadastrar</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';

import { reactive } from 'vue';

const servico = reactive({
  name: '',
  descricao: '',
})

const handleSubmit = async () =>{
  try{
    await axios.post('http://127.0.0.1:8000/api/servicos', {
      ...servico,
    })

    alert('serviço cadastrado')

    Object.keys(servico).forEach((k) => (servico[k] = ''))

  } catch (error) {
    console.error(error.response?.data || error.message)
    alert('Erro ao cadastrar')
  }
}

</script>

<style scoped>
.profissionais-form {
  max-width: 600px;
  width: 100%;
}

.rounded {
  border-radius: 20px;
}
</style>
