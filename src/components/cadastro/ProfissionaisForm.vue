<template>
  <div class="d-flex">
    <div class="profissionais-form flex-grow-1">
      <form @submit.prevent="handleSubmit" class="p-3">
        <!-- Nome completo -->
        <div class="form-group mb-3">
          <input
            type="text"
            class="form-control rounded-pill"
            placeholder="Nome completo"
            v-model="profissional.name"
            required
          />
        </div>

        <!-- Especialidade -->
        <div class="form-group mb-3">
          <select class="form-control rounded-pill" v-model="profissional.especialidade" required>
            <option value="">Selecione a especialidade</option>
            <option value="1">Psicologia</option>
            <option value="2">Psiquiatria</option>
            <option value="3">Terapia Ocupacional</option>
          </select>
        </div>

        <!-- CRP/CRM (Registro profissional) -->
        <div class="form-group mb-3">
          <input
            type="text"
            class="form-control rounded-pill"
            placeholder="Número do CRP/CRM"
            v-model="profissional.registro_profissional"
            required
          />
        </div>

        <!-- CNPJ -->
        <div class="form-group mb-3">
          <input
            type="text"
            class="form-control rounded-pill"
            placeholder="CNPJ"
            v-model="profissional.cnpj"
            v-mask="'##.###.###/####-##'"
            required
          />
        </div>

        <!-- Telefone -->
        <div class="form-group mb-3">
          <input
            type="tel"
            class="form-control rounded-pill"
            placeholder="Telefone"
            v-model="profissional.telefone"
            v-mask="['(##) ####-####', '(##) #####-####']"
            required
          />
        </div>

        <!-- Email -->
        <div class="form-group mb-3">
          <input
            type="email"
            class="form-control rounded-pill"
            placeholder="E-mail profissional"
            v-model="profissional.email"
            required
          />
        </div>

        <!-- Disponibilidade -->
        <div class="form-group mb-3">
          <textarea
            class="form-control rounded"
            placeholder="Observações: (disponibilidade de agenda)"
            v-model="profissional.disponibilidade"
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
import axios from 'axios'
import { reactive } from 'vue'

const profissional = reactive({
  name: '',
  especialidade: '',
  registro_profissional: '',
  cnpj: '',
  telefone: '',
  email: '',
  disponibilidade: '',
})

console.log(profissional);

const handleSubmit = async () => {
  try {
    await axios.post('http://127.0.0.1:8000/api/profissionais', {
      ...profissional,
    })

    alert('Profissional cadastrado')

    //limpa formulário
    Object.keys(profissional).forEach((k) => (profissional[k] = ''))
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
