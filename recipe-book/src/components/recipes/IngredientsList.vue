<script setup lang="ts">
import type { NamedIngredient, Resource } from '@/types'
import { computed, onMounted, ref, watch } from 'vue'

const props = defineProps<{
  modelValue: NamedIngredient[]
  options: Resource[]
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: NamedIngredient[]): void
}>()

const selected = ref<string | number>('')
const amount = ref<number>(0)

onMounted(() => {
  selected.value = props.options[0].id
})

watch(
  () => props.options,
  (value) => {
    if (value.length === 0) return
    selected.value = value[0].id
    amount.value = 0
  }
)

const selectedUnit = computed(() => {
  const option = props.options.find((option) => option.id === selected.value)
  return option?.unit
})

const canAdd = computed(() => {
  const option = props.options.find((option) => option.id === selected.value)
  return option && amount.value > 0
})

const add = () => {
  const option = props.options.find((option) => option.id === selected.value)
  if (option) {
    emit('update:modelValue', [...props.modelValue, { ...option, amount: amount.value }])
  }
}

const remove = (index: number) => {
  const newIngredients = [...props.modelValue]
  newIngredients.splice(index, 1)
  emit('update:modelValue', newIngredients)
}
</script>
<template>
  <div class="border-2 border-gray-400 flex flex-col p-1 bg-slate-50 rounded">
    <table class="w-full mb-2">
      <thead>
        <tr>
          <th class="w-8">#</th>
          <th class="text-left pl-2">Ingredient</th>
          <th class="text-left w-8">Amount</th>
          <th class="text-center">Unit</th>
          <th class="text-right w-8">Remove</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in modelValue" :key="index + '-' + item">
          <td class="w-8 font-bold text-center">{{ index + 1 }}.</td>
          <td class="text-left pl-2">{{ item.name }}</td>
          <td class="text-left w-8">{{ item.amount }}</td>
          <td class="text-center">{{ item.unit }}</td>
          <td class="text-right w-8">
            <button
              class="w-full font-bold text-center bg-gray-100 rounded drop-shadow"
              @click="remove(index)"
            >
              -
            </button>
          </td>
        </tr>

        <tr v-if="options.length > 0">
          <td class="w-8">
            <button
              class="w-full font-bold text-center bg-gray-100 rounded drop-shadow disabled:bg-gray-50 disabled:text-gray-200"
              :disabled="!canAdd"
              @click="canAdd && add()"
            >
              +
            </button>
          </td>
          <td class="text-left pl-2">
            <select
              v-model="selected"
              class="px-1 w-11/12 bg-slate-100 drop-shadow border-gray-500"
            >
              <option
                v-for="option in options"
                :key="option.id"
                :value="option.id"
                :selected="option.id === selected"
              >
                {{ option.name }}
              </option>
            </select>
          </td>
          <td class="text-left w-8">
            <input
              v-model="amount"
              class="w-full px-1 bg-slate-100 drop-shadow"
              type="number"
              placeholder="Amount"
            />
          </td>
          <td class="text-center">{{ selectedUnit }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
