<script setup lang="ts">
import HomeCard from '@/components/home/HomeCard.vue'
</script>

<template>
  <h1 class="text-center w-full text-6xl mb-4">Welcome</h1>
  <div class="flex flex-row justify-center gap-12 flex-wrap">
    <home-card
      title="Recipes"
      icon="assets/book.svg"
      icon-description="Recipe book (https://www.svgrepo.com/svg/509033/book-open)"
      path="/recipes"
    />
    <home-card
      title="Resources"
      icon="assets/groceries.svg"
      icon-description="Groceries (https://www.svgrepo.com/svg/3868/groceries)"
      path="/resources"
    />
  </div>
</template>
