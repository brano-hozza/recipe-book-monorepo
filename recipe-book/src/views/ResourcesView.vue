<script setup lang="ts">
import { useResourcesStore } from '@/stores/resources'
import CreateResource from '@/components/resources/CreateResource.vue'
import UpdateResource from '@/components/resources/UpdateResource.vue'
import { computed, ref, onMounted } from 'vue'
import type { Resource, UNIT } from '@/types'
const resourcesStore = useResourcesStore()

const resources = computed(() => resourcesStore.resources)
const creatingResource = ref<boolean>(false)
const editingResource = ref<boolean>(false)
const resource = ref<Resource | null>(null)

onMounted(async () => {
  await resourcesStore.getResources()
})

const editResource = (_r: Resource) => {
  console.log(resource)
  resource.value = _r
  editingResource.value = true
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
        <th class="text-left">Amount</th>
        <th class="text-left">Unit</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="resource in resources" :key="resource.id" class="hover:bg-gray-50">
        <td>{{ resource.name }}</td>
        <td>{{ resource.amount }}</td>
        <td>{{ resource.unit }}</td>
        <td><button @click="editResource(resource)">Edit</button></td>
      </tr>
    </tbody>
  </table>
  <!--Add new resource modal-->
  <create-resource v-model="creatingResource" />
  <update-resource v-model="editingResource" :resource="resource" />

  <!--Add new resource button-->
  <span
    class="absolute bottom-6 right-6 w-12 h-12 rounded-full text-center text-4xl bg-purple-500 text-white cursor-pointer"
    @click="creatingResource = true"
  >
    +
  </span>
</template>
