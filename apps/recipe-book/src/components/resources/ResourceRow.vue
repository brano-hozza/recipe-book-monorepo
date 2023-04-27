<script setup lang="ts">
import type { Resource } from '@/types'

defineProps<{
  resource: Resource
  loading: boolean
}>()
defineEmits<{
  (event: 'edit'): void
  (event: 'delete'): void
}>()
</script>
<template>
  <tr class="hover:bg-gray-50">
    <td>{{ resource.name }}</td>
    <td>{{ resource.amount }}</td>
    <td>{{ resource.unit }}</td>
    <td>
      <button
        :disabled="loading"
        class="disabled:bg-slate-200 disabled:cursor-not-allowed"
        @click="$emit('edit')"
      >
        Edit
      </button>
    </td>
    <td>
      <button
        :disabled="loading"
        class="disabled:bg-slate-200 disabled:cursor-not-allowed"
        @click="$emit('delete')"
      >
        Delete
      </button>
    </td>
  </tr>
</template>
