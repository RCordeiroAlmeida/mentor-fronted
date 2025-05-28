<template>
  <header class="top-menu">
    <div class="left-section">
      <span class="page-title">{{ pageTitle }}</span>
    </div>
    <div class="right-section">
      <!-- Ícone de notificações -->
      <button class="notification-icon" @click="toggleNotifications">
        <Bell :size="20" />
        <span class="notification-badge" v-if="unreadCount > 0">{{ unreadCount }}</span>
      </button>

      <!-- Dropdown do usuário -->
      <div class="user-dropdown">
        <img :src="userAvatar" alt="Foto do usuário" class="avatar" />
        <div class="dropdown-content">
          <a @click="logout">Sair</a>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import avatar from '@/assets/avatars/avatar.jpg';
import { Bell } from 'lucide-vue-next';

export default {
  name: 'TopMenu',
  components: {
    Bell
  },
  data() {
    return {
      userAvatar: avatar,
      unreadCount: 12 // Exemplo: número de notificações não lidas
    }
  },
  computed: {
    pageTitle(){
      return this.$route.name || 'Página';
    }
  },
  methods: {
    logout() {
      // Lógica de logout
    },
    toggleNotifications() {
      // Lógica para exibir notificações
      console.log('Mostrar notificações');
    }
  }
}
</script>

<style scoped>
.page-title{
  font-weight: bold;
  font-size: 1.5em;
}
.top-menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3rem;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 5vh;
}

.right-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.notification-icon {
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.notification-icon:hover {
  background-color: #f0f0f0;
}

.notification-badge {
  position: absolute;
  top: 0;
  right: 0;
  background-color: #ff4757;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
}

.dropdown-content {
  display: none;
  position: absolute;
  right: 0;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.user-dropdown:hover .dropdown-content {
  display: block;
}
</style>
