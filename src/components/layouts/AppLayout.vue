<template>
  <div class="app-layout">
    <SidebarMenu />
    <div class="main-area">
      <TopMenu />
      <main class="content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import SidebarMenu from '@/components/layouts/SidebarMenu.vue'
import TopMenu from './TopMenu.vue'

export default {
  components: { TopMenu, SidebarMenu },
}
</script>

<style scoped>
.app-layout {
  display: flex;
  height: 100vh;
  overflow: hidden; /* impede que o conteúdo transborde a largura da tela */
}

.main-area {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}

.content {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  overflow-x: hidden; /* bloqueia o scroll lateral */
  width: 100%;
  box-sizing: border-box;
}
</style>
