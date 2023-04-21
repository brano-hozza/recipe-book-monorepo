<script setup lang="ts">
const newRecipe = () => {
  console.log('new recipe')
}
</script>
<template>
  <h1 class="text-center w-full text-6xl mb-4">Recipes</h1>
  <span
    class="absolute bottom-6 right-6 w-12 h-12 rounded-full text-center text-4xl bg-purple-500 text-white cursor-pointer"
    @click="newRecipe"
  >
    +
  </span>
</template>
