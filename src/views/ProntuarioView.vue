<template>
  <input
    type="text"
    class="form-control mb-3"
    placeholder="Busca por nome..."
    v-model="termoBusca"
  />

  <PacientesTable :pacientes="pacientesFiltrados" />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import PacientesTable from '@/components/PacientesTable.vue'

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

onMounted(fetchPacientes)

const pacientesFiltrados = computed(() => {
  if (!termoBusca.value) return pacientes.value
  return pacientes.value.filter(p =>
    p.name.toLowerCase().includes(termoBusca.value.toLowerCase())
  )
})
</script>
