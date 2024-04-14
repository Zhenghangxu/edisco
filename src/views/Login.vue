<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'

import { ref } from 'vue'

const email = ref('')
const password = ref('')
defineProps<{
  email: string
}>()
</script>

<template>
  <div class="header">HEADER Lite placeholder</div>
  <div class="container">
    <form action="">
      <InputText type="text" v-model="email" placeholder="StudentID/Email" />
      <Password v-model="password" :feedback="false" />
    </form>
  </div>
</template>

<style lang="sass" scoped></style>
