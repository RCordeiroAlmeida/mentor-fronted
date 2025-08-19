<template>
  <div class="d-flex">
    <div class="salas-form flex-grow-1">
      <form @submit.prevent="handleSubmit" class="p-4">
        <!-- Nome da Sala -->
        <div class="form-group mb-3">
          <input
            type="text"
            class="form-control rounded-pill"
            placeholder="Nome da Sala"
            v-model="sala.nome"
            required
          />
        </div>

        <!-- Capacidade -->
        <div class="form-group mb-3">
          <input
            type="number"
            class="form-control rounded-pill"
            placeholder="Capacidade (pessoas)"
            v-model="sala.capacidade"
            min="1"
            required
          />
        </div>

        <!-- Equipamentos -->
        <div class="form-group mb-3">
          <label class="form-label">Equipamentos Disponíveis</label>
          <div class="equipamentos-container">
            <div v-for="(equipamento, index) in sala.equipamentos" :key="index" class="d-flex mb-2">
              <input
                type="text"
                class="form-control rounded-pill me-2"
                v-model="sala.equipamentos[index]"
                placeholder="Nome do equipamento"
              />
              <button
                type="button"
                class="btn btn-danger rounded-pill fs-6"
                @click="removerEquipamento(index)"
              >
              <DeleteIcon></DeleteIcon>
              </button>
            </div>
            <button
              type="button"
              class="btn btn-custom-outlined rounded-pill w-100"
              @click="adicionarEquipamento"
            >
              <Plus/> Equipamento
            </button>
          </div>
        </div>

        <!-- Fotos -->
        <div class="form-group mb-4">
          <label class="form-label">Fotos da Sala</label>
          <div class="fotos-container">
            <div v-for="(foto, index) in sala.fotos" :key="index" class="foto-item">
              <img :src="foto.preview" class="foto-preview rounded" />
              <button
                type="button"
                class="btn btn-danger btn-sm rounded-pill foto-remove"
                @click="removerFoto(index)"
              >
                <Trash></Trash>
              </button>
            </div>
            <label class="upload-btn rounded-pill gap-4">
              <Camera></Camera>
              Adicionar Fotos
              <input
                type="file"
                multiple
                accept="image/*"
                @change="adicionarFotos"
                style="display: none"
              />
            </label>
          </div>
        </div>

        <!-- Observações -->
        <div class="form-group mb-4">
          <textarea
            class="form-control rounded"
            placeholder="Observações adicionais"
            v-model="sala.observacoes"
            rows="3"
          ></textarea>
        </div>

        <button type="submit" class="btn btn-custom-primary rounded-pill w-100 py-2">
          Cadastrar
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { Camera, DeleteIcon, Plus, Trash } from 'lucide-vue-next'
import { ref } from 'vue'

const sala = ref({
  nome: '',
  capacidade: null,
  equipamentos: ['Televisão', 'Brinquedos'],
  fotos: [],
  observacoes: ''
})

const adicionarEquipamento = () => {
  sala.value.equipamentos.push('')
}

const removerEquipamento = (index) => {
  sala.value.equipamentos.splice(index, 1)
}

const adicionarFotos = (event) => {
  const files = event.target.files
  for (let i = 0; i < files.length; i++) {
    const reader = new FileReader()
    reader.onload = (e) => {
      sala.value.fotos.push({
        file: files[i],
        preview: e.target.result
      })
    }
    reader.readAsDataURL(files[i])
  }
}

const removerFoto = (index) => {
  sala.value.fotos.splice(index, 1)
}

const handleSubmit = () => {
  console.log('Dados da sala:', sala.value)
  alert('Sala cadastrada com sucesso!')
  // Aqui você enviaria os dados para o backend
}
</script>

<style scoped>
.salas-form {
  max-width: 600px;
  width: 100%;
}

.equipamentos-container {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 12px;
}

.fotos-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 10px;
  margin-top: 10px;
}

.foto-item {
  position: relative;
  height: 120px;
}

.foto-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.foto-remove {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.upload-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background: #f8f9fa;
  border: 1px dashed #ccc;
  cursor: pointer;
  transition: all 0.3s;
}

.upload-btn:hover {
  background: #e9ecef;
  border-color: #999;
}

.rounded {
  border-radius: 12px !important;
}

.rounded-pill {
  border-radius: 50px !important;
}
</style>
