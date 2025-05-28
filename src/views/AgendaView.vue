<template>
  <div class="agenda-view">
    <div class="agenda-header">
      <div class="header-left">
        <h1 class="agenda-title">Agenda</h1>
        <div class="view-actions">
          <button
            v-for="view in views"
            :key="view.value"
            :class="{ active: currentView === view.value }"
            @click="changeView(view.value)"
          >
            {{ view.label }}
          </button>
        </div>
      </div>
      <div class="header-right">
        <div class="date-navigation">
          <button @click="prevPeriod" class="nav-button">
            <ChevronLeft :size="20" />
          </button>
          <h2 class="current-date">{{ currentDateRange }}</h2>
          <button @click="nextPeriod" class="nav-button">
            <ChevronRight :size="20" />
          </button>
          <button @click="goToToday" class="today-button">
            Hoje
          </button>
        </div>
        <button @click="showEventModal" class="primary-button">
          <Plus :size="16" class="icon" />
          Novo Evento
        </button>
      </div>
    </div>

    <div class="agenda-container">
      <FullCalendar
        ref="calendarRef"
        :options="calendarOptions"
        @datesSet="updateDateRange"
      />
    </div>

    <!-- Modal para criar/editar eventos -->
    <EventModal
      v-if="showModal"
      :event="selectedEvent"
      @save="handleSaveEvent"
      @close="closeModal"
    />
  </div>
</template>

<script>
import { ChevronLeft, ChevronRight, Plus } from 'lucide-vue-next'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import ptBrLocale from '@fullcalendar/core/locales/pt-br'
import EventModal from '@/components/EventModal.vue'

export default {
  name: 'AgendaView',
  components: {
    FullCalendar,
    ChevronLeft,
    ChevronRight,
    Plus,
    EventModal
  },
  data() {
    return {
      currentView: 'dayGridMonth',
      currentDateRange: '',
      showModal: false,
      selectedEvent: null,
      views: [
        { value: 'dayGridMonth', label: 'Mês' },
        { value: 'timeGridWeek', label: 'Semana' },
        { value: 'timeGridDay', label: 'Dia' },
      ],
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        headerToolbar: false, // Escondemos a toolbar padrão
        locales: [ptBrLocale],
        locale: 'pt-br',
        firstDay: 0, // Domingo como primeiro dia da semana
        navLinks: true,
        editable: true,
        selectable: true,
        dayMaxEvents: true,
        eventDisplay: 'block',
        eventTimeFormat: {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        },
        eventColor: '#4F46E5',
        eventTextColor: '#FFFFFF',
        eventClick: this.handleEventClick,
        select: this.handleDateSelect,
        events: this.sampleEvents
      }
    }
  },
  computed: {
    sampleEvents() {
      return [
        {
          id: '1',
          title: 'Reunião de Planejamento',
          start: new Date(),
          end: new Date(new Date().setHours(new Date().getHours() + 2)),
          extendedProps: {
            description: 'Discutir metas trimestrais',
            location: 'Sala de Reuniões A'
          }
        },
        {
          id: '2',
          title: 'Almoço com Cliente',
          start: new Date(new Date().setDate(new Date().getDate() + 1)),
          end: new Date(new Date().setDate(new Date().getDate() + 1)),
          allDay: true,
          color: '#10B981'
        }
      ]
    }
  },
  methods: {
    getCalendarApi() {
      return this.$refs.calendarRef.getApi()
    },
    changeView(view) {
      this.currentView = view
      this.getCalendarApi().changeView(view)
    },
    updateDateRange(dateInfo) {
      const api = this.getCalendarApi()
      const view = api.view

      if (view.type === 'dayGridMonth') {
        this.currentDateRange = view.title
      } else {
        const start = new Date(dateInfo.start)
        const end = new Date(dateInfo.end)

        if (view.type === 'timeGridWeek') {
          this.currentDateRange = `${start.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })} - ${end.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })}`
        } else if (view.type === 'timeGridDay') {
          this.currentDateRange = start.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })
        }
      }
    },
    prevPeriod() {
      this.getCalendarApi().prev()
    },
    nextPeriod() {
      this.getCalendarApi().next()
    },
    goToToday() {
      this.getCalendarApi().today()
    },
    showEventModal() {
      this.selectedEvent = null
      this.showModal = true
    },
    handleDateSelect(selectInfo) {
      this.selectedEvent = {
        title: '',
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      }
      this.showModal = true
    },
    handleEventClick(clickInfo) {
      this.selectedEvent = {
        id: clickInfo.event.id,
        title: clickInfo.event.title,
        start: clickInfo.event.startStr,
        end: clickInfo.event.endStr,
        allDay: clickInfo.event.allDay,
        extendedProps: clickInfo.event.extendedProps
      }
      this.showModal = true
    },
    handleSaveEvent(eventData) {
      const calendarApi = this.getCalendarApi()
      const event = {
        id: eventData.id || String(Date.now()),
        title: eventData.title,
        start: eventData.start,
        end: eventData.end,
        allDay: eventData.allDay,
        color: eventData.color,
        extendedProps: eventData.extendedProps
      }

      if (eventData.id) {
        // Atualizar evento existente
        const existingEvent = calendarApi.getEventById(eventData.id)
        if (existingEvent) {
          existingEvent.remove()
        }
      }

      calendarApi.addEvent(event)
      this.closeModal()
    },
    closeModal() {
      this.showModal = false
      this.selectedEvent = null
    }
  },
  mounted() {
    this.updateDateRange({
      start: new Date(),
      end: new Date()
    })
  }
}
</script>

<style scoped>
.agenda-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f9fafb;
  padding: 1.5rem;
}

.agenda-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.agenda-title {
  font-size: 1.75rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.view-actions {
  display: flex;
  background: #f3f4f6;
  border-radius: 8px;
  padding: 4px;
}

.view-actions button {
  padding: 0.5rem 1rem;
  border: none;
  background: transparent;
  color: #6b7280;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 6px;
}

.view-actions button.active {
  background: white;
  color: #4F46E5;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.date-navigation {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.current-date {
  font-size: 1.125rem;
  font-weight: 500;
  color: #111827;
  margin: 0 0.5rem;
  min-width: 200px;
  text-align: center;
}

.nav-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  background: white;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s;
}

.nav-button:hover {
  background: #f3f4f6;
  border-color: #d1d5db;
}

.today-button {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  background: white;
  color: #374151;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.today-button:hover {
  background: #f3f4f6;
}

.primary-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  border-radius: 6px;
  border: none;
  background: #4F46E5;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.primary-button:hover {
  background: #4338CA;
}

.primary-button .icon {
  margin-right: 0.25rem;
}

.agenda-container {
  flex: 1;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  border: 1px solid #e5e7eb;
}

/* Estilos para o FullCalendar */
:deep(.fc) {
  height: 100%;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

:deep(.fc-toolbar) {
  display: none;
}

:deep(.fc-event) {
  border: none;
  border-radius: 6px;
  padding: 4px 6px;
  font-size: 0.8125rem;
  font-weight: 500;
}

:deep(.fc-event-title) {
  font-weight: 500;
}

:deep(.fc-daygrid-event-dot) {
  display: none;
}

:deep(.fc-daygrid-day-number) {
  color: #111827;
  font-weight: 500;
  padding: 8px;
}

:deep(.fc-day-today) {
  background-color: #f0fdf4 !important;
}

:deep(.fc-day-today .fc-daygrid-day-number) {
  color: #10B981;
  font-weight: 600;
}

:deep(.fc-col-header-cell) {
  background: #f9fafb;
  padding: 0.5rem 0;
}

:deep(.fc-col-header-cell .fc-scrollgrid-sync-inner) {
  padding: 0.5rem;
}

:deep(.fc-col-header-cell-cushion) {
  color: #4B5563;
  font-weight: 500;
  text-transform: uppercase;
  font-size: 0.75rem;
}

:deep(.fc-timegrid-slot-label-cushion) {
  font-size: 0.75rem;
  color: #6B7280;
}

@media (max-width: 768px) {
  .agenda-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .header-right {
    width: 100%;
    justify-content: space-between;
  }

  .date-navigation {
    order: -1;
  }
}
</style>
