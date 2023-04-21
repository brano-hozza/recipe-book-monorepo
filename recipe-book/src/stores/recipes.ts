import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Recipe } from '@/types'

export const useRecipesStore = defineStore('recipes', () => {
  const recipes = ref<Recipe[]>([])

  function addRecipe(recipe: Recipe) {
    recipes.value.push(recipe)
  }

  function updateRecipe(recipe: Recipe) {
    const index = recipes.value.findIndex((r) => r.id === recipe.id)
    recipes.value[index] = recipe
  }

  function deleteRecipe(recipe: Recipe) {
    const index = recipes.value.findIndex((r) => r.id === recipe.id)
    recipes.value.splice(index, 1)
  }

  return { recipes, addRecipe, updateRecipe, deleteRecipe }
})
