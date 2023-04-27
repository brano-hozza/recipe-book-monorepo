import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useTrpc } from '@/composables/trpc'
import type { Recipe, CreateRecipeDTO, RecipeDTO, UpdateRecipeDTO } from '@/types'

export const useRecipesStore = defineStore('recipes', () => {
  const recipes = ref<Recipe[]>([])
  const { trpc } = useTrpc()

  const getRecipes = async () => {
    recipes.value = (await trpc.recipe.getAll.query()).map((r) => ({
      ...r,
      ingredients: r.ingredients.map((i) => ({ id: i.resourceId, amount: i.amount }))
    }))
  }

  const addRecipe = async (recipe: CreateRecipeDTO) => {
    const recipeData: RecipeDTO = await trpc.recipe.create.mutate(recipe)
    recipes.value.push({
      ...recipeData,
      ingredients: recipeData.ingredients.map((i) => ({ id: i.resourceId, amount: i.amount }))
    })
  }

  const updateRecipe = async (recipe: UpdateRecipeDTO) => {
    const recipeData: RecipeDTO = await trpc.recipe.update.mutate(recipe)
    const index = recipes.value.findIndex((r) => r.id === recipeData.id)
    recipes.value[index] = {
      ...recipeData,
      ingredients: recipeData.ingredients.map((i) => ({ id: i.resourceId, amount: i.amount }))
    }
  }

  const deleteRecipe = async (id: number) => {
    await trpc.recipe.delete.mutate(id)
    const index = recipes.value.findIndex((r) => r.id === id)
    recipes.value.splice(index, 1)
  }

  return { recipes, addRecipe, updateRecipe, getRecipes, deleteRecipe }
})
