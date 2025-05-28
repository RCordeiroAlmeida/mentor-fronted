<template>
  <div class="agenda-container">
    <FullCalendar :options="calendarOptions" />
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

export default {
  name: 'AgendaComponent',
  components: {
    FullCalendar
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        initialEvents: [ // Eventos de exemplo
          {
            id: '1',
            title: 'Reunião com equipe',
            start: new Date(),
            end: new Date(new Date().setHours(new Date().getHours() + 1)),
            color: '#3788d8'
          },
          {
            id: '2',
            title: 'Almoço com cliente',
            start: new Date(new Date().setDate(new Date().getDate() + 1)),
            allDay: true,
            color: '#ff9f89'
          }
        ],
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents // Opcional: para debug
      }
    }
  },
  methods: {
    handleDateSelect(selectInfo) {
      const title = prompt('Digite o título do novo evento:')
      const calendarApi = selectInfo.view.calendar

      calendarApi.unselect() // limpa seleção

      if (title) {
        calendarApi.addEvent({
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay,
          color: '#4CAF50' // Cor verde para novos eventos
        })
      }
    },
    handleEventClick(clickInfo) {
      if (confirm(`Deseja deletar o evento '${clickInfo.event.title}'?`)) {
        clickInfo.event.remove()
      }
    },
    handleEvents(events) {
      console.log('Eventos atualizados:', events)
      // Útil para debug - pode remover depois
    }
  }
}
</script>

<style scoped>
.agenda-container {
  padding: 20px;
  height: 80vh; /* Ajuste conforme necessário */
  width: 100%;
}

/* Estilos para o calendário */
:deep(.fc) {
  height: 100%;
  font-family: inherit;
}

:deep(.fc-toolbar) {
  margin-bottom: 1em;
}

:deep(.fc-daygrid-event) {
  cursor: pointer;
  border-radius: 4px;
  padding: 2px 4px;
  font-size: 0.85em;
}

:deep(.fc-event-title) {
  white-space: normal; /* Permite quebra de linha */
}

:deep(.fc-daygrid-event-dot) {
  display: none; /* Remove o ponto antes do título */
}
</style>
