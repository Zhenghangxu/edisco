<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'

import { ref } from 'vue'

const loginEmail = ref('')
const password = ref('')
const inputStyle = 'p-2'

defineProps<{
  email: string
}>()
</script>

<template>
  <div class="header">HEADER Lite placeholder</div>
  <div class="container mx-auto">
    <form action="">
      <div class="flex flex-col gap-3">
        <InputText type="text" v-model="loginEmail" placeholder="StudentID/Email" :class="inputStyle" />
        <Password v-model="password" :feedback="false" placeholder="password" />
      </div>
    </form>
  </div>
</template>

<style scoped>
:deep(input[type='password']) {
  @apply p-2;
}
</style>
