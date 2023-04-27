<script setup lang="ts">
import type { NamedIngredient, Recipe } from '@/types'
import { onMounted, ref, watch } from 'vue'
import MyModal from '../utils/MyModal.vue'
import IngredientsList from './IngredientsList.vue'
import InstructionsList from './InstructionsList.vue'

const props = defineProps<{
  modelValue: boolean
  recipe: Recipe | null
  ingredients: NamedIngredient[]
}>()

const recipeName = ref<string>('')
const recipeDescription = ref<string>('')
const ingredients = ref<NamedIngredient[]>([])
const instructions = ref<string[]>([])
onMounted(() => {
  if (props.recipe) {
    recipeName.value = props.recipe.name
    recipeDescription.value = props.recipe.description ?? ''
    ingredients.value = props.ingredients
    instructions.value = props.recipe.instructions
  }
})

watch(
  () => props.recipe,
  (recipe) => {
    if (recipe) {
      recipeName.value = recipe.name
      recipeDescription.value = recipe.description ?? ''
      ingredients.value = props.ingredients
      instructions.value = recipe.instructions
    }
  }
)
</script>
<template>
  <my-modal
    :modelValue="modelValue"
    @update:modelValue="(val: boolean) => $emit('update:modelValue', val)"
  >
    <template #title> Recipe detail </template>
    <template #body>
      <label for="name" class="flex flex-col gap-1">
        <span class="underline font-bold">Name</span>
        {{ recipeName }}
      </label>
      <label for="description" class="flex flex-col gap-1">
        <span class="underline font-bold">Description</span>
        {{ recipeDescription }}
      </label>
      <label for="ingredients" class="flex flex-col gap-1">
        <span class="underline font-bold">Ingredients</span>
        <ingredients-list v-model="ingredients" view />
      </label>
      <label for="instructions" class="flex flex-col gap-1">
        <span class="underline font-bold">Instructions</span>
        <instructions-list v-model="instructions" view />
      </label>
    </template>
  </my-modal>
</template>
