<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { ROUTES } from '@/router'
import { useResourcesStore } from './stores/resources'
import { useRecipesStore } from './stores/recipes'
import { onMounted } from 'vue'
const router = useRouter()
const resourcesStore = useResourcesStore()
const recipesStore = useRecipesStore()

onMounted(() => {
  resourcesStore.getResources()
  recipesStore.getRecipes()
})
</script>

<template>
  <header class="w-full bg-slate-50 drop-shadow mb-4">
    <nav class="flex flex-row justify-evenly h-12 items-center">
      <span
        v-for="route in ROUTES"
        :key="route.name"
        class="cursor-pointer underline"
        @click="router.push(route.path)"
      >
        {{ route.name }}
      </span>
    </nav>
  </header>

  <RouterView />
</template>
