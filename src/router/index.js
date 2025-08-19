// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import AppLayout from '@/components/layouts/AppLayout.vue'
import AgendaView from '@/views/AgendaView.vue'
import FinanceiroView from '@/views/FinanceiroView.vue'
import CadastroView from '@/views/CadastroView.vue'
import PacientesView from '@/views/cadastro/PacientesView.vue'
import ProfissionaisView from '@/views/cadastro/ProfissionaisView.vue'
import SalasView from '@/views/cadastro/SalasView.vue'
import ProntuarioView from '@/views/ProntuarioView.vue'
import ServicosView from '@/views/cadastro/ServicosView.vue'

const routes = [
  {
    path: '/',
    redirect: '/login', // Redireciona para login
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/',
    component: AppLayout, // Layout aplicado às rotas filhas
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardView, // Rota com layout (menus)
      },
      {
        path: '/agenda',
        name: 'Agenda',
        component: AgendaView
      },
      {
        path: '/financeiro',
        name: 'Financeiro',
        component: FinanceiroView
      },
      {
        path: '/prontuario',
        name: 'Prontuário',
        component: ProntuarioView
      },
      {
        path: '/cadastros',
        name: 'Cadastro',
        component: CadastroView,
        children: [
          {
            path: 'pacientes',
            name: 'Cadastro mínimo de paciente (CMP)',
            component: PacientesView
          },
          {
            path: 'profissionais',
            name: 'Cadastro de Profissional',
            component: ProfissionaisView
          },
          {
            path: 'salas',
            name: 'Cadastro de Salas',
            component: SalasView
          },
          {
            path: 'servicos',
            name: 'Cadastro de Serviços prestados',
            component: ServicosView
          },
        ]
      },


    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
