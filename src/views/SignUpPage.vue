<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import LayoutPage from './LayoutPage.vue'
import Button from 'primevue/button'
import Divider from 'primevue/divider'
import NavLite from '@/components/NavLite.vue'
import { ref } from 'vue'
import BasicPage from './BasicPage.vue'
import InputOtp from 'primevue/inputotp'

const signUpEmail = ref('')
const password = ref('')
const rfCode = ref('')
const inputStyle = ''

defineProps<{
  email: string
  referralCode: string
}>()
</script>

<template>
  <BasicPage>
    <LayoutPage
      type="full"
      internalLayout="vertical"
      gap="0"
      padding="0"
      className="items-stretch flex-nowrap justify-center gap-8 lg:gap-[30px] lg:flex-row sm:items-center p-2 sm:p-0 my-8 md:my-[120px]"
    >
      <LayoutPage type="half" internalLayout="vertical" gap="0" padding="0">
        <NavLite title="Master Your Future Now" />
      </LayoutPage>
      <LayoutPage
        type="half"
        internalLayout="vertical"
        gap="0"
        padding="0"
        className="items-stretch"
      >
        <form action="" class="flex justify-center">
          <LayoutPage
            type="full"
            internalLayout="vertical"
            gap="6"
            padding="0"
            className="max-w-[420px]"
          >
            <InputText
              type="text"
              v-model="signUpEmail"
              placeholder="Email"
              name="email"
              :class="inputStyle"
            />
            <Password v-model="password" placeholder="Password" name="password" toggleMask />
            <div class="flex flex-row max-w-full gap-4 justify-center items-center">
              <span class="font-sans text-base text-slate-700">Referral Code</span>
              <InputOtp
                v-model="rfCode"
                placeholder="Referral Code"
                :length="5"
                name="referralCode"
                :pt="{ input: { root: { style: { 'text-transform': 'uppercase' } } } }"
              />
            </div>
            <Button label="Sign Up" type="submit" severity="primary"></Button>
          </LayoutPage>
        </form>
      </LayoutPage>
    </LayoutPage>
  </BasicPage>
</template>

<style scoped></style>

<!-- :ptOptions="{autocomplete:'one-time-code'}" -->
