<script setup lang="ts">
import LayoutPage from './LayoutPage.vue'
import Button from 'primevue/button'
import BasicPage from './BasicPage.vue'
import InterestSelect from '@/components/InterestSelect.vue'


defineProps<{
  selectedItems?: Array<string>
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
            className="max-w-[95vw] md:max-w-[900px]"
          >
            <h3 class="sub-heading text-2xl text-center font-serif">Tell Us What You Like</h3>
            <InterestSelect></InterestSelect>
            <div class="flex flex-row mt-4 md:mt-[100px]">
              <Button
                label="Continue"
                type="submit"
                severity="primary"
                class="w-full md:w-[70%] mx-auto"
              >
              </Button>
              <Button
                label="Remind Me Later"
                link
                severity="secondary"
                class="w-full md:w-[70%] mx-auto"
              ></Button>
            </div>
          </LayoutPage>
        </form>
      </LayoutPage>
    </LayoutPage>
  </BasicPage>
</template>

<style scoped></style>

<!-- :ptOptions="{autocomplete:'one-time-code'}" -->
