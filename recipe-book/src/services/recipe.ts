import type { Recipe, NewRecipeDTO, UpdateRecipeDTO } from '@/types'

export class RecipeService {
  private static instance: RecipeService
  private static readonly endpoint = 'http://localhost:3000/recipes'
  private constructor() {}

  static getInstance(): RecipeService {
    if (!RecipeService.instance) {
      RecipeService.instance = new RecipeService()
    }
    return RecipeService.instance
  }

  async getRecipes(): Promise<Recipe[]> {
    const response = await fetch(RecipeService.endpoint)
    return await response.json()
  }

  async getRecipe(id: number): Promise<Recipe> {
    const response = await fetch(`${RecipeService.endpoint}/${id}`)
    return await response.json()
  }

  async createRecipe(recipe: NewRecipeDTO): Promise<Recipe> {
    const response = await fetch(RecipeService.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(recipe)
    })
    return await response.json()
  }

  async updateRecipe(recipe: UpdateRecipeDTO): Promise<Recipe> {
    const response = await fetch(`${RecipeService.endpoint}/${recipe.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(recipe)
    })
    return await response.json()
  }
}
