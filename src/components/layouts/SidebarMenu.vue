<template>
  <aside>
    <nav class="sidebar">
      <img :src="logo" alt="Logo" width="150px" class="svg-logo" />
      <ul class="menu-list">
        <li v-for="item in menuItems.slice(0, -1)" :key="item.path">
          <router-link :to="item.path" class="menu-link">
            <component :is="item.icon" class="menu-icon" />
            <span class="menu-text">{{ item.label }}</span>
          </router-link>
        </li>
      </ul>
      <ul class="logout-list">
        <li>
          <router-link :to="menuItems[menuItems.length - 1].path" class="menu-link menu-text">
            <component :is="menuItems[menuItems.length - 1].icon" class="logout-icon" />
            <span>{{ menuItems[menuItems.length - 1].label }}</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import logo from '@/assets/logo.svg'
import { LayoutDashboard, CalendarDays, HandCoins, LogOut, FileUser} from 'lucide-vue-next'

const menuItems = [
  {
    path: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard, // Use o componente diretamente (sem string)
  },
  {
    path: '/agenda',
    label: 'Agenda',
    icon: CalendarDays, // Adicione ícone
  },
  {
    path: '/financeiro',
    label: 'Financeiro',
    icon: HandCoins, // Adicione ícone
  },
  {
    path: '/cadastros',
    label: 'Cadastro',
    icon: FileUser, // Adicione ícone
  },
  {
    path: '/logout',
    label: 'Sair',
    icon: LogOut, // Adicione ícone
  },
]
</script>

<style scoped>
.sidebar {
  background: var(--primary);
  width: 250px;
  height: 100vh;
  padding: 1rem;
}

.menu-list,
.logout-list {
  list-style-type: none; /* Remove as bolinhas */
  padding-left: 0; /* Opcional: remove o recuo padrão da lista */
}

.logout-list {
  border-top: 1px solid rgba(255, 255, 255, 0.1); /* Linha separadora (opcional) */
  padding-top: 10px;
}

.logout-icon {
  color: var(--danger);
}

.menu-text {
  font-weight: 500;
}

.menu-link {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 15px;
  color: var(--white);
  text-decoration: none;
  border-radius: 4px;
  transition: background 0.3s;
}

.menu-link:hover {
  background: var(--primary-hover);
}

.menu-icon {
  width: 25px;
  height: 25px;
  color: currentColor;
}

.svg-logo {
  filter: brightness(0) invert(1);
}
</style>
