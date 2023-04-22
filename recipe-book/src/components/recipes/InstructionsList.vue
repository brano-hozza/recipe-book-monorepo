<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  modelValue: string[]
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: string[]): void
}>()

const newInstruction = ref<string>('')

const add = () => {
  emit('update:modelValue', [...props.modelValue, newInstruction.value])
  newInstruction.value = ''
}
</script>
<template>
  <div class="border-2 border-gray-400 flex flex-col p-2 bg-slate-50 rounded">
    <table class="w-full mb-2">
      <thead>
        <tr>
          <th class="w-8">#</th>
          <th class="text-left">Instruction</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in modelValue" :key="index + '-' + item">
          <td class="w-8 font-bold text-center">{{ index + 1 }}.</td>
          <td class="text-left">{{ item }}</td>
        </tr>
      </tbody>
    </table>
    <span class="w-full flex flex-row justify-between">
      <textarea
        v-model="newInstruction"
        class="px-2 w-4/5 mr-2 bg-slate-100 drop-shadow"
        placeholder="New instruction"
      />
      <button class="bg-slate-200 drop-shadow w-1/5" @click="add">Add</button>
    </span>
  </div>
</template>
