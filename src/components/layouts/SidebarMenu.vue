<template>
  <aside :class="{ 'collapsed': isCollapsed }">
    <nav class="sidebar">
      <div class="toggle-container">
        <img :src="logo" alt="Logo" width="150px" class="svg-logo" v-if="!isCollapsed" />
        <button @click="toggleSidebar" class="toggle-btn">
          <component :is="isCollapsed ? ChevronRight : ChevronLeft" class="toggle-icon" />
        </button>
      </div>

      <ul class="menu-list">
        <li v-for="item in mainMenuItems" :key="item.path">
          <router-link
            v-if="!item.children"
            :to="item.path"
            class="menu-link"
            :title="isCollapsed ? item.label : ''"
          >
            <component :is="item.icon" class="menu-icon" />
            <span class="menu-text" v-if="!isCollapsed">{{ item.label }}</span>
          </router-link>

          <div v-else class="submenu-container">
            <div
              class="menu-link submenu-header"
              @click="toggleSubmenu(item)"
              :title="isCollapsed ? item.label : ''"
            >
              <component :is="item.icon" class="menu-icon" />
              <span class="menu-text" v-if="!isCollapsed">{{ item.label }}</span>
              <component
                v-if="!isCollapsed"
                :is="item.isOpen ? ChevronDown : ChevronRight"
                class="submenu-arrow"
              />
            </div>

            <ul v-show="item.isOpen && !isCollapsed" class="submenu">
              <li v-for="child in item.children" :key="child.path">
                <router-link :to="child.path" class="submenu-link">
                  <span class="submenu-text">{{ child.label }}</span>
                </router-link>
              </li>
            </ul>
          </div>
        </li>
      </ul>

      <ul class="logout-list">
        <li>
          <router-link :to="logoutItem.path" class="menu-link menu-text" :title="isCollapsed ? logoutItem.label : ''">
            <component :is="logoutItem.icon" class="logout-icon" />
            <span v-if="!isCollapsed">{{ logoutItem.label }}</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { ref } from 'vue';
import logo from '@/assets/logo.svg'
import {
  LayoutDashboard,
  CalendarDays,
  HandCoins,
  LogOut,
  FileUser,
  ChevronRight,
  ChevronDown,
  ChevronLeft
} from 'lucide-vue-next'

const isCollapsed = ref(false);

const mainMenuItems = ref([
  {
    path: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    path: '/agenda',
    label: 'Agenda',
    icon: CalendarDays,
  },
  {
    path: '/financeiro',
    label: 'Financeiro',
    icon: HandCoins,
  },
  {
    label: 'Cadastro',
    icon: FileUser,
    isOpen: false,
    children: [
      {
        path: '/cadastros/pacientes',
        label: 'Pacientes - CMP',
      },
      {
        path: '/cadastros/profissionais',
        label: 'Profissionais',
      },
      {
        path: '/cadastros/salas',
        label: 'Salas',
      },
    ]
  },
]);

const logoutItem = {
  path: '/logout',
  label: 'Sair',
  icon: LogOut,
};

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
  // Fecha todos os submenus quando a sidebar é colapsada
  if (isCollapsed.value) {
    mainMenuItems.value.forEach(item => {
      if (item.children) item.isOpen = false;
    });
  }
};

const toggleSubmenu = (item) => {
  if (isCollapsed.value) {
    toggleSidebar(); // Expande a sidebar se estiver colapsada
    item.isOpen = true;
  } else {
    item.isOpen = !item.isOpen;
  }
};
</script>

<style scoped>
aside {
  transition: width 0.3s ease;
  width: 250px;
  overflow: hidden;
}

aside.collapsed {
  width: 60px;
}

.sidebar {
  background: var(--primary);
  height: 100vh;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  width: 250px;
}

.toggle-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0 0.5rem;
}

.toggle-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: background 0.3s;
}

.toggle-btn:hover {
  background: var(--primary-hover);
}

.toggle-icon {
  width: 20px;
  height: 20px;
}

.menu-list,
.logout-list,
.submenu {
  list-style-type: none;
  padding-left: 0;
}

.menu-list {
  flex-grow: 1;
}

.logout-list {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 10px;
}

.logout-icon {
  color: var(--danger);
}

.menu-text {
  font-weight: 500;
  white-space: nowrap;
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
  cursor: pointer;
  white-space: nowrap;
}

.menu-link:hover {
  background: var(--primary-hover);
}

.menu-icon {
  width: 25px;
  height: 25px;
  color: currentColor;
  flex-shrink: 0;
}

.svg-logo {
  filter: brightness(0) invert(1);
}

/* Submenu styles */
.submenu-container {
  margin-bottom: 4px;
}

.submenu-arrow {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  margin-left: auto;
}

.submenu {
  margin-top: 4px;
  margin-left: 40px;
}

.submenu-link {
  display: block;
  padding: 8px 15px;
  color: var(--white);
  text-decoration: none;
  border-radius: 4px;
  transition: background 0.3s;
}

.submenu-link:hover {
  background: var(--primary-hover);
}

.submenu-text {
  font-size: 0.9em;
  opacity: 0.9;
  white-space: nowrap;
}

aside.collapsed .menu-text,
aside.collapsed .submenu-arrow,
aside.collapsed .svg-logo {
  display: none;
}

aside.collapsed .menu-icon {
  display: block !important;
  margin: 0 auto;
}

aside.collapsed .menu-link {
  justify-content: center;
  padding: 12px 5px;
  gap: 0;
}

aside.collapsed .logout-icon {
  display: block !important;
  margin: 0 auto;
}

aside.collapsed .submenu-header {
  justify-content: center;
}
</style>
