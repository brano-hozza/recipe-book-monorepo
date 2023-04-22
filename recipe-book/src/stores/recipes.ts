import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useTrpc } from '@/composables/trpc'
import type { Recipe } from '@/types'
import type {
  CreateRecipeDTO,
  RecipeDTO,
  UpdateRecipeDTO
} from '../../../recipe-book-api/src/router/recipe'

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
  return { recipes, addRecipe, updateRecipe, getRecipes }
})
