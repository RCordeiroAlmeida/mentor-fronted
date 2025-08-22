<template>
  <div class="bg-white border rounded-3 shadow p-2">
    <div class="table-responsive" style="max-height: 700px; overflow-y: auto">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Data de Nascimento</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>CPF</th>
            <th>Status</th>
            <th>...</th>
          </tr>
        </thead>
        <transition-group name="fade-slide" tag="tbody">
          <tr v-for="p in pacientes" :key="p.id">
            <td>{{ p.name }}</td>
            <td>{{ formatarData(p.data_nascimento) }}</td>
            <td>{{ p.email || '-' }}</td>
            <td>{{ mascararTelefone(p.telefone) || '-' }}</td>
            <td>{{ p.cpf }}</td>
            <td>
              <span class="status-badge" :class="p.status === 1 ? 'ativo' : 'inativo'">
                <span class="dot"></span>
                {{ p.status === 1 ? 'Ativo' : 'Inativo' }}
              </span>
            </td>
            <td class="d-flex gap-2">
              <button class="btn btn-custom-third btn-icon"><Eye /></button>
              <button class="btn btn-custom-secondary btn-icon"><Pencil /></button>
              <button class="btn btn-custom-primary btn-icon" @click="abrirProntuario(p)">
                <ClipboardPlusIcon />
              </button>
            </td>
          </tr>
        </transition-group>
      </table>
    </div>
  </div>

  <ProntuarioModal
    :paciente="pacienteSelecionado"
    :show="showProntuario"
    @close="showProntuario = false"
    @updated="fetchPlanos()"
  />
</template>



<script setup>
import { ref } from 'vue'
import { Eye, Pencil, ClipboardPlusIcon } from 'lucide-vue-next'
import { formatarData, mascararTelefone } from '@/utils/formatters'

import ProntuarioModal from './ProntuarioModal.vue'

defineProps({
  pacientes: { type: Array, default: () => [] },
})

const pacienteSelecionado = ref({id: null, name: ''})
const showProntuario = ref(false)

const abrirProntuario = (paciente) => {
  pacienteSelecionado.value = ({id: paciente.id, name: paciente.name})
  showProntuario.value = true
}
</script>

<style scoped>
.btn-icon {
  padding: 4px 6px;
}
.btn-icon svg {
  width: 16px;
  height: 16px;
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

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
