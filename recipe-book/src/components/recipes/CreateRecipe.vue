<script setup lang="ts">
import { useRecipesStore } from '@/stores/recipes'
import { useResourcesStore } from '@/stores/resources'
import type { NamedIngredient } from '@/types'
import { computed, ref } from 'vue'
import MyModal from '../utils/MyModal.vue'
import IngredientsList from './IngredientsList.vue'
import InstructionsList from './InstructionsList.vue'

defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): boolean
}>()

const recipesStore = useRecipesStore()
const resourcesStore = useResourcesStore()

const options = computed(() => resourcesStore.resources)

const filteredOptions = computed(() => {
  const usedIngredients = ingredients.value.map((i) => i.id)
  return options.value.filter((o) => !usedIngredients.includes(o.id))
})

const loading = ref<boolean>(false)
const recipeName = ref<string>('')
const recipeDescription = ref<string>('')
const ingredients = ref<NamedIngredient[]>([])
const instructions = ref<string[]>([])

const canCreate = computed(
  () =>
    !loading.value &&
    recipeName.value.length > 4 &&
    ingredients.value.length > 0 &&
    instructions.value.length > 0
)

const createRecipe = async () => {
  loading.value = true
  await recipesStore.addRecipe({
    name: recipeName.value,
    description: recipeDescription.value,
    ingredients: ingredients.value,
    instructions: instructions.value
  })
  emit('update:modelValue', false)
  loading.value = false
}
</script>
<template>
  <my-modal
    :modelValue="modelValue"
    @update:modelValue="(val: boolean) => $emit('update:modelValue', val)"
  >
    <template #title> Create new recipe </template>
    <template #body>
      <label for="name" class="flex flex-col gap-1">
        <span>Name</span>
        <input v-model="recipeName" class="border-slate-200 border-2 rounded p-1" type="text" />
      </label>
      <label for="description" class="flex flex-col gap-1">
        <span>Description</span>
        <textarea v-model="recipeDescription" class="border-slate-200 border-2 rounded p-1" />
      </label>
      <label for="ingredients" class="flex flex-col gap-1">
        <span>Ingredients</span>
        <ingredients-list v-model="ingredients" :options="filteredOptions" />
      </label>
      <label for="instructions" class="flex flex-col gap-1">
        <span>Instructions</span>
        <instructions-list v-model="instructions" />
      </label>
    </template>
    <template #actions>
      <button
        type="button"
        :disabled="!canCreate"
        class="px-4 py-2 bg-purple-500 text-white rounded-lg disabled:bg-purple-100 disabled:cursor-not-allowed"
        @click="canCreate && createRecipe()"
      >
        Create
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
