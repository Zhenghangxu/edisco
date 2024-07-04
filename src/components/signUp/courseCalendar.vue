<script lang="ts">
import { defineComponent, watch } from 'vue'
import { CalendarOptions, EventApi, DateSelectArg, EventClickArg } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/vue3'
import ProgressSpinner from 'primevue/progressspinner'
import { Icon } from '@iconify/vue/dist/iconify.js'
import { calendarPropsDefault } from '@/utils/event-utils'

export default defineComponent({
  components: {
    FullCalendar,
    Icon,
    ProgressSpinner
  },
  props: {
    calendarOptions: {
      type: Object as () => CalendarOptions,
      required: true,
      default: () => calendarPropsDefault
    },
    state: {
      type: String,
      required: true,
      default: 'default'
    },
    disableText: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {
      currentEvents: [] as EventApi[]
    }
  },
  methods: {
    // handleWeekendsToggle() {
    //   this.calendarOptions.weekends = !this.calendarOptions.weekends // update a property
    // },
    handleDateSelect(selectInfo: DateSelectArg) {
      return
      //   let title = prompt('Please enter a new title for your event')
      //   let calendarApi = selectInfo.view.calendar

      //   calendarApi.unselect() // clear date selection

      //   if (title) {
      //     calendarApi.addEvent({
      //       id: createEventId(),
      //       title,
      //       start: selectInfo.startStr,
      //       end: selectInfo.endStr,
      //       allDay: selectInfo.allDay
      //     })
      //   }
    },
    handleEventClick(clickInfo: EventClickArg) {
      //   if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      //     clickInfo.event.remove()
      //   }
    },
    handleEvents(events: EventApi[]) {
      this.currentEvents = events
    }
  },
  watch: {
    calendarOptions: {
      deep: false,
      handler() {
        console.log('calendarOptions changed')
        console.log(this.calendarOptions)
      }
    }
  },
})
</script>

<template>
  <div class="edisco-calendar">
    <div class="edisco-calendar-main">
      <div class="flex flex-col items-center gap-4" v-if="state === 'searching'">
        <Icon
          icon="icon-park-twotone:file-search-two"
          width="60"
          height="60"
          class="text-primary"
        />
        <div class="text-xl font-sans font-semibold leading-2 max-w-[80%]">
          Please complete the selection so that we have enough data to generate schedule
        </div>
      </div>
      <div
        class="flex flex-col items-center gap-4 p-10 rounded-md border-1 border-gray-200 border-dashed m-2"
        v-if="state === 'loading'"
      >
        <ProgressSpinner
          strokeWidth="6"
          animationDuration="2.5s"
          style="width: 80px; height: 80px"
          aria-label="Loading"
          :pt="{
            spinner: (options) => ({
              class: ['spinner-graidient-override']
            })
          }"
        />
        <!-- no gradient -->
        <h4 class="text-xl font-serif font-semibold my-2 text-slate-700">
          Generating Your Schedule
        </h4>
        <p class="text-base font-sans text-center font-light leading-1 m-0">
          Please complete the section on the left to get the best result
        </p>
      </div>
      <FullCalendar
        class="calendar-component"
        :options="calendarOptions"
        v-if="state === 'default'"
      >
        <template v-slot:eventContent="arg">
          <div v-if="!disableText">
            <b>{{ arg.timeText }}</b>
            <i>{{ arg.event.title }}</i>
          </div>
        </template>
      </FullCalendar>
    </div>
  </div>
</template>

<style scoped>
h2 {
  margin: 0;
  font-size: 16px;
}

ul {
  margin: 0;
  padding: 0 0 0 1.5em;
}

li {
  margin: 1.5em 0;
  padding: 0;
}

b {
  /* used for event dates/times */
  margin-right: 3px;
}

.edisco-calendar {
  display: flex;
  font-size: 14px;
  @apply font-sans;
}

.edisco-calendar-main {
  flex-grow: 1;
}

.fc {
  /* the calendar root */
  max-width: 1100px;
  margin: 0 auto;
}
</style>

<style lang="scss" global>
.edisco-calendar {
  .fc-scrollgrid.fc-scrollgrid-liquid {
    @apply rounded-md overflow-hidden;
  }
  .fc-col-header-cell-cushion {
    @apply py-3;
  }
  .spinner-graidient-override circle {
    animation-name: p-progress-spinner-dash, p-progress-spinner-color-override !important;
  }
}
@keyframes p-progress-spinner-color-override {
  100%,
  0% {
    stroke: var(--secondary-color);
  }
}
</style>
