<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRecipesStore } from '@/stores/recipes'
import type { NamedIngredient, Recipe } from '@/types'
import CreateRecipe from '@/components/recipes/CreateRecipe.vue'
import UpdateRecipe from '@/components/recipes/UpdateRecipe.vue'
import RecipeDetail from '@/components/recipes/RecipeDetail.vue'
import RecipeRow from '@/components/recipes/RecipeRow.vue'
import { useResourcesStore } from '@/stores/resources'

const recipesStore = useRecipesStore()
const resourcesStore = useResourcesStore()

const recipes = computed(() => recipesStore.recipes)
const resources = computed(() => resourcesStore.resources)
const loading = ref<boolean>(false)

const newRecipeModal = ref<boolean>(false)
const editRecipeModal = ref<boolean>(false)
const recipeDetailModal = ref<boolean>(false)
const selectedRecipe = ref<Recipe | null>(null)

const selectedRecipeIngredients = computed(() => {
  if (selectedRecipe.value) {
    return selectedRecipe.value.ingredients.map((ingredient) => {
      const resource = resources.value.find((r) => r.id === ingredient.id)
      return {
        ...ingredient,
        name: resource?.name,
        unit: resource?.unit
      } as NamedIngredient
    })
  }
  return [] as NamedIngredient[]
})

const viewRecipe = (recipe: Recipe) => {
  selectedRecipe.value = recipe
  recipeDetailModal.value = true
}

const editRecipe = (recipe: Recipe) => {
  selectedRecipe.value = recipe
  editRecipeModal.value = true
}

const deleteRecipe = async (recipe: Recipe) => {
  await recipesStore.deleteRecipe(recipe.id)
}
</script>
<template>
  <h1 class="text-center w-full text-6xl mb-4">Recipes</h1>
  <!--Table of recipes-->
  <table class="w-full table-auto border-collapse border border-gray-200">
    <thead
      class="border-b-2 border-gray-200 bg-gray-100 text-left text-gray-600 text-sm uppercase tracking-wider"
    >
      <tr>
        <th class="text-left font-extrabold">Name</th>
        <th class="text-left font-semibold hidden md:inline">Description</th>
        <th class="text-left font-semibold">Ingredients</th>
        <th class="text-left font-semibold hidden md:inline">Instructions</th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <recipe-row
        v-for="recipe in recipes"
        :key="recipe.id"
        :recipe="recipe"
        :loading="loading"
        @select="viewRecipe(recipe)"
        @edit="editRecipe(recipe)"
        @delete="deleteRecipe(recipe)"
      />
    </tbody>
  </table>
  <!--Add new recipe modal-->
  <create-recipe v-model="newRecipeModal" />

  <!--Edit recipe modal-->
  <update-recipe
    v-model="editRecipeModal"
    :recipe="selectedRecipe"
    :ingredients="selectedRecipeIngredients"
  />

  <!--View recipe detail-->
  <recipe-detail
    v-model="recipeDetailModal"
    :recipe="selectedRecipe"
    :ingredients="selectedRecipeIngredients"
  />

  <span
    class="absolute bottom-6 right-6 w-12 h-12 rounded-full text-center text-4xl bg-purple-500 text-white cursor-pointer"
    @click="newRecipeModal = true"
  >
    +
  </span>
</template>
