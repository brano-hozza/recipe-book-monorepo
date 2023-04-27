import type { Unit } from './resource'

export interface Ingredient {
  id: number
  amount: number
}

export type NamedIngredient = Ingredient & { name: string; unit: Unit }

export interface Recipe {
  id: number
  name: string
  description: string | null
  img: string | null
  ingredients: Ingredient[]
  instructions: string[]
}
