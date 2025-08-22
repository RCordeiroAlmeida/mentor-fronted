<template>
  <!-- Modal Bootstrap -->
  <div
    class="modal fade"
    ref="modalRef"
    tabindex="-1"
    aria-labelledby="prontuarioModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="prontuarioModalLabel">
            Planos de Acompanhamento de {{ paciente.name }}
          </h5>
          <button type="button" class="btn-close" @click="fecharModal" aria-label="Fechar"></button>
        </div>
        <div class="modal-body">
          <div v-if="loading" class="d-flex justify-content-center align-items-center gap-2 py-3">
            <div class="spinner-border text-custom-primary" role="status"></div>
            <span>Carregando planos...</span>
          </div>

          <div class="bg-white border rounded-3 shadow p-2">
            <div v-if="planos.length">
              <table class="table table-hover" v-if="planos.length">
                <thead>
                  <tr>
                    <th>Início</th>
                    <th>Profissional</th>
                    <th>Situação</th>
                    <th>...</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="plano in planos" :key="plano.id">
                    <td>{{ formatarData(plano.data_inicio) }}</td>
                    <td>{{ plano.profissional.name }}</td>
                    <td>
                      <span class="status-badge" :class="plano.status ? 'ativo' : 'inativo'">
                        <span class="dot"></span>
                        {{ plano.status ? 'Ativo' : 'Inativo' }}
                      </span>
                    </td>
                    <td>
                      <button class="btn btn-custom-primary btn-icon">
                        <Play></Play>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div v-else class="alert alert-custom-info">
                Este paciente ainda não possui planos de acompanhamento.
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-danger" @click="fecharModal">Fechar</button>
          <button type="button" class="btn btn-custom-outlined" @click="abrirForm">
            <PlusIcon></PlusIcon>
            Novo Plano
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatarData } from '@/utils/formatters'
import { ref, watch } from 'vue'
import axios from 'axios'

import * as bootstrap from 'bootstrap'
import { Play, PlusIcon } from 'lucide-vue-next'

const props = defineProps({
  paciente: { type: Object, required: true }, // { id, name }
  show: { type: Boolean, required: true },
})
const emit = defineEmits(['close', 'updated'])

const planos = ref([])
const loading = ref(false)
const modalRef = ref(null)

let bsModal = null

watch(
  () => props.show,
  async (val) => {
    if (val) {
      if (!bsModal) {
        bsModal = new bootstrap.Modal(modalRef.value)
        modalRef.value.addEventListener('hidden.bs.modal', () => {
          emit('close')
        })
      }
      await fetchPlanos()
      bsModal.show()
    } else if (bsModal) {
      bsModal.hide()
    }
  },
)

// Buscar planos do paciente
const fetchPlanos = async () => {
  loading.value = true
  try {
    const res = await axios.get(`http://127.0.0.1:8000/api/pacientes/${props.paciente.id}/planos`)
    console.log('Resposta da API:', res.data) // <--- verifique aqui
    // Se não vier data ou for vazio, setar array vazio
    planos.value = res.data?.data || []
  } catch (err) {
    console.error(err)
    planos.value = []
  } finally {
    loading.value = false
  }
}
// Abrir formulário de novo plano (implementaremos depois)
const abrirForm = () => {
  console.log('Abrir formulário de novo plano')
}

// Fechar modal
const fecharModal = () => {
  emit('close')
}
</script>

<style scoped>
.modal-body {
  max-height: 60vh;
  overflow-y: auto;
}

.status-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
}

.status-badge .dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

.status-badge.ativo .dot {
  background-color: #28a745; /* verde */
}

.status-badge.inativo .dot {
  background-color: #6c757d; /* cinza */
}

.btn-icon {
  padding: 4px 6px;
}
.btn-icon svg {
  width: 16px;
  height: 16px;
}
</style>
