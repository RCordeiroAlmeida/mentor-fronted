<template>
  <div class="d-flex align-items-center justify-content-center">
    <div class="pacientes-form flex-grow-1">
      <form @submit.prevent="handleSubmit" class="p-3">
        <!-- Nome completo -->
        <div class="form-group mb-3">
          <input
            type="text"
            class="form-control rounded-pill"
            id="nome"
            placeholder="Nome completo"
            v-model="cliente.nome"
            required
          />
        </div>

        <!-- Data de nascimento + idade -->
        <div class="form-group mb-3 d-flex align-items-center gap-3">
          <input
            type="date"
            class="form-control rounded-pill"
            id="data_nascimento"
            v-model="cliente.data_nascimento"
            @change="calcularIdade"
            required
          />
        </div>

        <!-- Campos extras se menor de idade -->
        <div v-if="idade !== null && idade < 18">
          <hr />
          <div class="form-group mb-3">
            <input
              type="text"
              class="form-control rounded-pill"
              placeholder="Nome do Pai"
              v-model="cliente.nome_pai"
            />
          </div>

          <div class="form-group mb-3">
            <input
              type="text"
              class="form-control rounded-pill"
              placeholder="Nome da Mãe"
              v-model="cliente.nome_mae"
            />
          </div>
          <hr />
        </div>
        <!-- Email -->
        <div class="form-group mb-3">
          <input
            type="email"
            class="form-control rounded-pill"
            placeholder="E-mail"
            v-model="cliente.email"
            required
          />
        </div>

        <!-- Endereço -->
        <div class="form-group mb-3">
          <input
            type="text"
            class="form-control rounded-pill"
            placeholder="Endereço"
            v-model="cliente.endereco"
          />
        </div>

        <!-- CPF -->
        <div class="form-group mb-3">
          <input
            type="text"
            class="form-control rounded-pill"
            placeholder="CPF"
            v-model="cliente.cpf"
            required
          />
        </div>

        <button type="submit" class="btn btn-custom-primary rounded-pill w-100">Cadastrar</button>
      </form>
    </div>
    <div class="card flex-grow-1" style="width: 18rem; height: 18rem">
      <div class="card-body">
        <h5 class="card-title">Atenção</h5>
        <p class="card-text">
          Nesta tela são coletados apenas dados essenciais para agendamento da primeira consulta.
        </p>
        <p>
          Informações complementares (escolaridade, histórico clínico, etc.) serão registradas <strong>após a entrevista inicial</strong> pelo psicólogo responsável.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

// Dados do cliente
const cliente = reactive({
  nome: '',
  data_nascimento: '',
  nome_pai: '',
  nome_mae: '',
  email: '',
  endereco: '',
  cpf: '',
})

const idade = ref(null)

// Calcula idade a partir da data de nascimento
const calcularIdade = () => {
  if (!cliente.data_nascimento) {
    idade.value = null
    return
  }
  const hoje = new Date()
  const nascimento = new Date(cliente.data_nascimento)
  let anos = hoje.getFullYear() - nascimento.getFullYear()
  const mes = hoje.getMonth() - nascimento.getMonth()

  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
    anos--
  }
  idade.value = anos
}

// Submissão do formulário
const handleSubmit = () => {
  console.log('Dados enviados:', { ...cliente, idade: idade.value })
  alert('Cliente cadastrado com sucesso!')

  // Resetando formulário
  Object.keys(cliente).forEach((k) => (cliente[k] = ''))
  idade.value = null
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
</style>
