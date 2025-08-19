<template>
  <div class="d-flex">
    <div class="pacientes-form flex-grow-1">
      <form @submit.prevent="handleSubmit" class="p-3">
        <!-- Nome completo -->
        <div class="form-group mb-3">
          <input
            type="text"
            class="form-control rounded-pill"
            placeholder="Nome completo"
            v-model="paciente.name"
            required
          />
        </div>

        <!-- Data de nascimento + idade -->
        <div class="form-group mb-3">
          <input
            type="date"
            class="form-control rounded-pill"
            v-model="paciente.data_nascimento"
            @change="calcularIdade"
            required
          />
          <small v-if="idade !== null" class="text-muted">Idade: {{ idade }} anos</small>
        </div>

        <!-- Campos extras se menor de idade -->
        <div v-if="idade !== null && idade < 18" class="mb-3 p-3">
          <h5 class="mb-3">Responsáveis</h5>
          <div class="form-group mb-3">
            <input
              type="text"
              class="form-control rounded-pill"
              placeholder="Nome do Pai"
              v-model="paciente.nome_pai"
            />
          </div>

          <div class="form-group mb-3">
            <input
              type="text"
              class="form-control rounded-pill"
              placeholder="Nome da Mãe"
              v-model="paciente.nome_mae"
            />
          </div>
        </div>

        <!-- Email -->
        <div class="form-group mb-3">
          <input
            type="email"
            class="form-control rounded-pill"
            placeholder="E-mail"
            v-model="paciente.email"
            required
          />
        </div>

        <!-- Telefone -->
        <div class="form-group mb-3">
          <input
            type="tel"
            class="form-control rounded-pill"
            placeholder="Telefone"
            v-model="paciente.telefone"
            v-mask="['(##) ####-####', '(##) #####-####']"
            required
          />
        </div>

        <!-- Endereço -->
        <div class="form-group mb-3">
          <input
            type="text"
            class="form-control rounded-pill"
            placeholder="Endereço"
            v-model="paciente.endereco"
          />
        </div>

        <!-- CPF -->
        <div class="form-group mb-4">
          <input
            type="text"
            class="form-control rounded-pill"
            placeholder="CPF"
            v-model="paciente.cpf"
            v-mask="'###.###.###-##'"
            required
          />
        </div>

        <button type="submit" class="btn btn-custom-primary rounded-pill w-100 py-2">
          Cadastrar
        </button>
      </form>
    </div>

    <!-- Card de Atenção -->
    <div class="flex-grow-1 mt-3" style="max-width: 320px">
      <div class="card-body">
        <div class="alert alert-info">
          <p class="card-text small">
            <Info />
            Nesta tela são coletados apenas dados essenciais para agendamento da primeira consulta.
          </p>
          <p class="small mb-0">
            Informações complementares serão registradas
            <strong>após a entrevista inicial</strong> pelo psicólogo responsável.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'

import { Info } from 'lucide-vue-next'
import { reactive, ref } from 'vue'

// Dados do paciente
const paciente = reactive({
  name: '',
  data_nascimento: '',
  nome_pai: '',
  nome_mae: '',
  email: '',
  telefone: '',
  endereco: '',
  cpf: '',
})

const idade = ref(null)

// Calcula idade a partir da data de nascimento
const calcularIdade = () => {
  if (!paciente.data_nascimento) {
    idade.value = null
    return
  }
  const hoje = new Date()
  const nascimento = new Date(paciente.data_nascimento)
  let anos = hoje.getFullYear() - nascimento.getFullYear()
  const mes = hoje.getMonth() - nascimento.getMonth()

  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
    anos--
  }
  idade.value = anos
}

// Submissão do formulário
const handleSubmit = async () => {
  try {
    await axios.post('http://127.0.0.1:8000/api/pacientes', {
      ...paciente,
    })

    alert('Paciente cadastrado')

    //limpa formulário
    Object.keys(paciente).forEach((k) => (paciente[k] = ''))
    idade.value = null
  } catch (error) {
    console.error(error.response?.data || error.message)
    alert('Erro ao cadastrar')
  }
}
</script>

<style scoped>
.pacientes-form {
  max-width: 600px;
  width: 100%;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-label {
  font-weight: 500;
  margin-bottom: 0.5rem;
  display: block;
}

.rounded-pill {
  border-radius: 50px !important;
}

.card {
  border-radius: 12px;
}
</style>
