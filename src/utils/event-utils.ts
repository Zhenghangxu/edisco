import type { CalendarOptions, EventApi, DateSelectArg, EventClickArg } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import type { EventInput } from '@fullcalendar/core'

export const calendarPropsDefault: CalendarOptions = {
  themeSystem: 'bootstrap5',
  plugins: [
    dayGridPlugin,
    timeGridPlugin,
    interactionPlugin // needed for dateClick
  ],
  dayHeaderFormat: { weekday: 'short' },
  headerToolbar: {
    left: '',
    center: '',
    right: ''
  },
  slotMinTime: '08:00:00',
  slotMaxTime: '22:00:00',
  slotDuration: '01:00:00',
  initialView: 'timeGridWeek',
  allDaySlot: false,
  timeZone: 'EST',
  // events: [
  //   {
  //     id: '01',
  //     title: 'All-day event',
  //     start: new Date().toISOString().replace(/T.*$/, '') + 'T00:00:00'
  //   },
  //   {
  //     id: '02',
  //     title: 'Timed event',
  //     start: new Date().toISOString().replace(/T.*$/, '') + 'T12:00:00'
  //   }
  // ] as EventInput[], // alternatively, use the `events` setting to fetch from a feed
  editable: false,
  selectable: false,
  selectMirror: false,
  dayMaxEvents: false,
  weekends: false,
  // select: this.handleDateSelect,
  // eventClick: this.handleEventClick,
  // eventsSet: this.handleEvents
  /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
}
