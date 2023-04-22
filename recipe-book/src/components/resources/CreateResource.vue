<script setup lang="ts">
import { useResourcesStore } from '@/stores/resources'
import { UNIT } from '@/types'
import { computed, ref } from 'vue'
import MyModal from '../utils/MyModal.vue'

defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): boolean
}>()

const resourcesStore = useResourcesStore()

const loading = ref<boolean>(false)
const resourceName = ref<string>('')
const resourceDescription = ref<string>('')
const resourceAmount = ref<number>(0)
const resourceUnit = ref<UNIT>(UNIT.PCS)

const canCreate = computed(
  () => !loading.value && resourceName.value.length > 4 && resourceAmount.value > 0
)

const createResource = async () => {
  loading.value = true
  const newResource = {
    name: resourceName.value,
    description: resourceDescription.value,
    amount: resourceAmount.value,
    unit: resourceUnit.value
  }
  console.log(newResource)
  await resourcesStore.addResource(newResource)
  emit('update:modelValue', false)
  loading.value = false
}
</script>
<template>
  <my-modal
    @update:modelValue="(val: boolean) => $emit('update:modelValue', val)"
    :modelValue="modelValue"
  >
    <template #title> Create new resource </template>
    <template #body>
      <label class="flex flex-col gap-1">
        <span>Name</span>
        <input v-model="resourceName" class="border-slate-200 border-2 rounded p-1" type="text" />
      </label>
      <label class="flex flex-col gap-1">
        <span>Description</span>
        <textarea v-model="resourceDescription" class="border-slate-200 border-2 rounded p-1" />
      </label>
      <label class="flex flex-col gap-1">
        <span>Quantity</span>
        <input
          v-model="resourceAmount"
          class="border-slate-200 border-2 rounded p-1"
          type="number"
        />
      </label>
      <label class="flex flex-col gap-1">
        <span>Type</span>
        <select v-model="resourceUnit" class="border-slate-200 border-2 rounded p-1">
          <option value="G">G</option>
          <option value="ML">ML</option>
          <option value="PCS">PCS</option>
        </select>
      </label>
    </template>
    <template #actions>
      <button
        type="button"
        :disabled="!canCreate"
        class="px-4 py-2 bg-purple-500 text-white rounded-lg disabled:bg-purple-100 disabled:cursor-not-allowed"
        @click="canCreate && createResource()"
      >
        Add
      </button>
      <button
        type="button"
        class="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg ml-4"
        @click="$emit('update:modelValue', false)"
      >
        Cancel
      </button>
    </template>
  </my-modal>
</template>
