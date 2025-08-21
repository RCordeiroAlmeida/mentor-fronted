<template>
   <input
      type="text"
      class="form-control mb-3"
      placeholder="Busca por nome..."
      v-model="termoBusca"
    />

  <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Data de Nascimento</th>
          <th>Email</th>
          <th>Telefone</th>
          <th>CPF</th>
          <th>...</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in pacientesFiltrados" :key="p.id">
          <td>{{ p.name }}</td>
          <td>{{ formatarData(p.data_nascimento) }}</td>
          <td>{{ p.email || '-' }}</td>
          <td>{{ mascararTelefone(p.telefone) || '-' }}</td>
          <td>{{ p.cpf}}</td>
          <td class="d-flex gap-2">
            <button class="btn btn-primary btn-icon"><Eye/></button>
            <button class="btn btn-warning btn-icon"><Pencil></Pencil></button>
            <button class="btn btn-custom-primary btn-icon"><ClipboardPlusIcon></ClipboardPlusIcon></button>
          </td>
        </tr>
      </tbody>
    </table>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { formatarData, mascararTelefone } from '@/utils/formatters'
import { Eye, Pencil, ClipboardPlusIcon } from 'lucide-vue-next'

const termoBusca = ref('')
const pacientes = ref([])

const fetchPacientes = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/pacientes')
    pacientes.value = response.data.data
  } catch (error) {
    console.error(error.response?.data || error.message)
  }
}

onMounted(() => {
  fetchPacientes()
})

// Lista filtrada com base na busca
const pacientesFiltrados = computed(() => {
  if (!termoBusca.value) return pacientes.value
  return pacientes.value.filter(p =>
    p.name.toLowerCase().includes(termoBusca.value.toLowerCase())
  )
})
</script>

<style scoped>
.btn-icon {
  padding: 4px 6px;
}
.btn-icon svg {
  width: 16px;
  height: 16px;
}
</style>
