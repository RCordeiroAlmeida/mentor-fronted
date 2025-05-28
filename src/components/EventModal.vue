<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-container">
      <div class="modal-header">
        <h3>{{ event.id ? 'Editar Evento' : 'Novo Evento' }}</h3>
        <button @click="close" class="close-button">
          <X :size="20" />
        </button>
      </div>

      <div class="modal-body">
        <div class="form-group">
          <label>Título</label>
          <input v-model="formData.title" type="text" placeholder="Nome do evento">
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Início</label>
            <input v-model="formData.start" type="datetime-local">
          </div>
          <div class="form-group">
            <label>Fim</label>
            <input v-model="formData.end" type="datetime-local">
          </div>
        </div>

        <div class="form-group">
          <label>
            <input v-model="formData.allDay" type="checkbox">
            Dia inteiro
          </label>
        </div>

        <div class="form-group">
          <label>Cor</label>
          <div class="color-options">
            <button
              v-for="color in colorOptions"
              :key="color.value"
              :style="{ backgroundColor: color.value }"
              :class="{ active: formData.color === color.value }"
              @click="formData.color = color.value"
            />
          </div>
        </div>

        <div class="form-group">
          <label>Descrição</label>
          <textarea v-model="formData.extendedProps.description" rows="3"></textarea>
        </div>

        <div class="form-group">
          <label>Localização</label>
          <input v-model="formData.extendedProps.location" type="text" placeholder="Onde será o evento?">
        </div>
      </div>

      <div class="modal-footer">
        <button @click="close" class="secondary-button">Cancelar</button>
        <button @click="save" class="primary-button">Salvar</button>
      </div>
    </div>
  </div>
</template>

<script>
import { X } from 'lucide-vue-next'

export default {
  name: 'EventModal',
  components: { X },
  props: {
    event: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      formData: {
        id: null,
        title: '',
        start: '',
        end: '',
        allDay: false,
        color: '#4F46E5',
        extendedProps: {
          description: '',
          location: ''
        }
      },
      colorOptions: [
        { value: '#4F46E5', name: 'Roxo' },
        { value: '#10B981', name: 'Verde' },
        { value: '#3B82F6', name: 'Azul' },
        { value: '#F59E0B', name: 'Amarelo' },
        { value: '#EF4444', name: 'Vermelho' }
      ]
    }
  },
  created() {
    if (this.event) {
      this.formData = {
        id: this.event.id || null,
        title: this.event.title || '',
        start: this.formatDateTime(this.event.start, this.event.allDay),
        end: this.formatDateTime(this.event.end, this.event.allDay),
        allDay: this.event.allDay || false,
        color: this.event.color || '#4F46E5',
        extendedProps: {
          description: this.event.extendedProps?.description || '',
          location: this.event.extendedProps?.location || ''
        }
      }
    }
  },
  methods: {
    formatDateTime(dateStr, isAllDay) {
      if (!dateStr) return ''

      const date = new Date(dateStr)

      if (isAllDay) {
        return date.toISOString().split('T')[0]
      }

      const isoString = date.toISOString()
      return isoString.substring(0, 16)
    },
    save() {
      this.$emit('save', {
        ...this.formData,
        start: this.formData.allDay
          ? this.formData.start
          : new Date(this.formData.start).toISOString(),
        end: this.formData.allDay
          ? this.formData.end
          : new Date(this.formData.end).toISOString()
      })
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-container {
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
}

.close-button {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
}

.close-button:hover {
  background: #f3f4f6;
  color: #111827;
}

.modal-body {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.form-group input[type="text"],
.form-group input[type="datetime-local"],
.form-group textarea {
  width: 100%;
  padding: 0.625rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  transition: border-color 0.2s;
}

.form-group input[type="text"]:focus,
.form-group input[type="datetime-local"]:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #4F46E5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.form-group textarea {
  min-height: 80px;
  resize: vertical;
}

.form-row {
  display: flex;
  gap: 1rem;
}

.form-row .form-group {
  flex: 1;
}

.color-options {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.color-options button {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
}

.color-options button.active {
  border-color: #1f2937;
  transform: scale(1.1);
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.primary-button {
  padding: 0.625rem 1.25rem;
  background: #4F46E5;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.primary-button:hover {
  background: #4338CA;
}

.secondary-button {
  padding: 0.625rem 1.25rem;
  background: white;
  color: #374151;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.secondary-button:hover {
  background: #f9fafb;
  border-color: #9ca3af;
}

input[type="checkbox"] {
  margin-right: 0.5rem;
}
</style>
