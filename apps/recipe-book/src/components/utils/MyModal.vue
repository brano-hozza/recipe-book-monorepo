<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
defineProps<{
  modelValue: boolean
}>()

defineEmits<{
  (event: 'update:modelValue', value: boolean): boolean
}>()
</script>
<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-20"
  >
    <div class="bg-white rounded-lg p-8 w-full md:w-1/2">
      <h2 class="text-center text-2xl mb-4"><slot name="title" /></h2>
      <div class="flex flex-col gap-4">
        <slot name="body" />
        <div class="flex justify-end">
          <slot name="actions">
            <button
              type="button"
              class="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg ml-4"
              @click="$emit('update:modelValue', false)"
            >
              Cancel
            </button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>
