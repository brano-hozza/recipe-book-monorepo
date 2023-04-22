<script setup lang="ts">
import type { Recipe } from '@/types'

defineProps<{
  recipe: Recipe
  loading: boolean
}>()
defineEmits<{
  (event: 'edit'): void
  (event: 'delete'): void
}>()
</script>
<template>
  <tr class="hover:bg-gray-50">
    <td class="font-bold">{{ recipe.name }}</td>
    <td class="hidden md:inline">{{ recipe.description }}</td>
    <td>{{ recipe.ingredients.length }}</td>
    <td class="hidden md:inline">{{ recipe.instructions.length }}</td>
    <td>
      <button
        :disabled="loading"
        class="disabled:bg-slate-200 disabled:cursor-not-allowed text-blue-400"
        @click="$emit('edit')"
      >
        Edit
      </button>
    </td>
    <td>
      <button
        :disabled="loading"
        class="disabled:bg-slate-200 disabled:cursor-not-allowed text-red-500"
        @click="$emit('delete')"
      >
        Delete
      </button>
    </td>
  </tr>
</template>
