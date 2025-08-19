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
            v-model="profissional.nome"
            required
          />
        </div>

        <!-- Especialidade -->
        <div class="form-group mb-3">
          <select
            class="form-control rounded-pill"
            v-model="profissional.especialidade"
            required
          >
            <option value="">Selecione a especialidade</option>
            <option value="psicologia">Psicologia</option>
            <option value="psiquiatria">Psiquiatria</option>
            <option value="terapia_ocupacional">Terapia Ocupacional</option>
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
        <button type="submit" class="btn btn-custom-primary rounded-pill w-100">
          Cadastrar
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mask } from 'vue-the-mask'

export default {
  directives: { mask },
  data() {
    return {
      profissional: {
        nome: '',
        especialidade: '',
        registro_profissional: '',
        cnpj: '',
        telefone: '',
        email: '',
        endereco_consultorio: '',
        disponibilidade: ''
      }
    }
  },
  methods: {
    handleSubmit() {
      // Lógica para enviar os dados do profissional
      console.log('Dados do profissional:', this.profissional)
    }
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
