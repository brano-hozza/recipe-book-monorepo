<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { ROUTES } from '@/router'
const router = useRouter()
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
