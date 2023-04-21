<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { ROUTES } from '@/router'
import type { Recipe, Resource } from './types'
import { useResourcesStore } from './stores/resources'
import { useRecipesStore } from './stores/recipes'
const router = useRouter()
const resourcesStore = useResourcesStore()
const recipesStore = useRecipesStore()

// Mock some resources
const resources: Resource[] = [
  {
    id: 1,
    category: 'Fruits',
    name: 'Apple',
    quantity: 2
  },
  {
    id: 2,
    category: 'Fruits',
    name: 'Banana',
    quantity: 3
  },
  {
    id: 3,
    category: 'Vegetables',
    name: 'Carrot',
    quantity: 4
  }
]

resources.forEach(resourcesStore.addResource)

// Mock some recipes
const recipes: Recipe[] = [
  {
    id: 1,
    name: 'Apple Pie',
    ingredients: [1, 2, 3],
    instructions: ['Preheat oven to 425 degrees F (220 degrees C).']
  }
]

recipes.forEach(recipesStore.addRecipe)
</script>

<template>
  <header class="w-full bg-slate-50 drop-shadow mb-4">
    <nav class="flex flex-row justify-evenly h-12 items-center">
      <span
        v-for="route in ROUTES"
        class="cursor-pointer underline"
        :key="route.name"
        @click="router.push(route.path)"
      >
        {{ route.name }}
      </span>
    </nav>
  </header>

  <RouterView />
</template>
