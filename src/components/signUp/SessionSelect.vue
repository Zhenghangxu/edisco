<script setup lang="ts">
import Listbox from 'primevue/listbox'
import { ref, watch, defineProps, withDefaults, defineEmits } from 'vue'
import loadingSkeleton from '@/components/signUp/loadingSkeleton.vue'
import { Icon } from '@iconify/vue/dist/iconify.js'
import Avatar from 'primevue/avatar'

export interface SessionSelectProps {
  optionaLabel?: string
  fetchedOfferings?: any
  isLoading?: boolean
  name?: string
  // articles, card-horizontal, card-vertical, paragraph
}

const props = withDefaults(defineProps<SessionSelectProps>(), {
  fetchedOfferings: null,
  optionaLabel: 'sessionSelect',
  name: 'sessionSelect',
  isLoading: true
})

const selectedSession = ref(null)

const emit = defineEmits(['update:selectedSession'])

watch(selectedSession, (newVal) => {
  emit('update:selectedSession', newVal)
})
</script>

<template>
  <div class="flex flex-col gap-5 p-7" v-show="isLoading">
    <loadingSkeleton type="sessionSelect" />
    <loadingSkeleton type="sessionSelect" />
    <loadingSkeleton type="sessionSelect" />
  </div>
  <Listbox
    v-model="selectedSession"
    v-if="isLoading === false"
    :name="name"
    :optionDisabled="(option) => option.disabled"
    :options="fetchedOfferings"
    :optionLabel="optionaLabel"
    class="w-full md:w-full"
    listStyle="max-height:450px"
    :pt="{
      list: (options) => ({
        class: ['flex', 'flex-col', 'gap-4']
      }),
      root: (options) => ({
        class: ['border-none', 'shadow-none']
      }),
      item: (options) => ({
        class: ['p-6', 'rounded-md']
      })
    }"
  >
    <template #option="slotProps">
      <div
        :class="`flex flex-row justify-between items-center${slotProps.option.disabled ? ' option-disabled' : ''}`"
      >
        <div class="flex flex-row items-center gap-3">
          <Avatar
            v-if="slotProps.option.avatar"
            :image="slotProps.option.avatar"
            shape="circle"
            size="large"
          />
          <div class="flex flex-col align-items-center gap-3">
            <div class="text-xl font-serif font-semibold text-slate-800">
              {{ slotProps.option.title }}
            </div>
            <div class="text-md font-sans text-slate-700">
              {{ slotProps.option.subTitle }}
            </div>
            <div
              class="text-sm font-sans font-light flex flex-row items-center gap-2"
              v-if="slotProps.option.alertMessage"
            >
              <Icon
                v-if="slotProps.option.alertMessageType !== 'time'"
                icon="ph:warning-circle-bold"
                width="20"
                height="20"
                class="text-black-500"
              />
              <Icon
                v-if="slotProps.option.alertMessageType === 'time'"
                icon="ph:clock"
                width="20"
                height="20"
                class="text-black-500"
              />
              {{ slotProps.option.alertMessage }}
            </div>
          </div>
        </div>
        <Icon
          icon="ph:check-circle-fill"
          width="27"
          height="27"
          class="text-secondary opacity-65 item-check"
        />
      </div>
    </template>
  </Listbox>
</template>

<style scoped>
.item-check {
  display: none;
}
.p-highlight .item-check {
  display: block;
}
.option-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
