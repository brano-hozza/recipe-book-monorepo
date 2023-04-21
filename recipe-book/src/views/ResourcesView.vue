<script setup lang="ts">
import { useResourcesStore } from '@/stores/resources'
import { computed } from 'vue'
const resourcesStore = useResourcesStore()

const resources = computed(() => resourcesStore.resources)
const newResource = () => {
  console.log('new resource')
}
</script>
<template>
  <h1 class="text-center w-full text-6xl mb-4">Resources</h1>
  <!--Table of resource-->
  <table class="w-full table-auto border-collapse border border-gray-200">
    <thead
      class="border-b-2 border-gray-200 bg-gray-100 text-left text-gray-600 text-sm uppercase tracking-wider"
    >
      <tr>
        <th class="text-left">Name</th>
        <th class="text-left">Category</th>
        <th class="text-left">Quantity</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="resource in resources" :key="resource.id" class="hover:bg-gray-50">
        <td>{{ resource.name }}</td>
        <td>{{ resource.category }}</td>
        <td>{{ resource.quantity }}</td>
      </tr>
    </tbody>
  </table>
  <span
    class="absolute bottom-6 right-6 w-12 h-12 rounded-full text-center text-4xl bg-purple-500 text-white cursor-pointer"
    @click="newResource"
  >
    +
  </span>
</template>
