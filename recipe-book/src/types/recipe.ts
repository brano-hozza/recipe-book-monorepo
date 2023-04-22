export interface Ingredient {
  id: number
  amount: number
}
export interface Recipe {
  id: number
  name: string
  description: string | null
  img: string | null
  ingredients: Ingredient[]
  instructions: string[]
}
