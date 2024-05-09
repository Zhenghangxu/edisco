<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import LayoutPage from './LayoutPage.vue'
import Button from 'primevue/button'
import Divider from 'primevue/divider'
import NavLite from '@/components/NavLite.vue'
import { ref } from 'vue'

const loginEmail = ref('')
const password = ref('')
const inputStyle = ''

defineProps<{
  email: string
}>()
</script>

<template>
  <LayoutPage
    type="full"
    internalLayout="vertical"
    gap="0"
    padding="0"
    className="items-stretch flex-nowrap justify-center gap-8 lg:gap-[30px] lg:flex-row sm:items-center p-2 sm:p-0"
  >
    <LayoutPage type="half" internalLayout="vertical" gap="0" padding="0">
      <NavLite title="Master Your Future Now" />
    </LayoutPage>
    <LayoutPage type="half" internalLayout="vertical" gap="0" padding="0" className="items-stretch">
      <form action="" class="flex justify-center">
        <LayoutPage
          type="full"
          internalLayout="vertical"
          gap="6"
          padding="0"
          className="max-w-[420px]"
        >
          <InputText type="text" v-model="loginEmail" placeholder="Email" :class="inputStyle" />
          <Password v-model="password" :feedback="false" placeholder="Password" />
          <Button label="Log In" type="submit" severity="primary"></Button>
          <Divider align="center" class="m-0">
            <span>Already Have An Account?</span>
          </Divider>
          <Button label="Sign Up" severity="secondary"></Button>
        </LayoutPage>
      </form>
    </LayoutPage>
  </LayoutPage>
</template>

<style scoped></style>
