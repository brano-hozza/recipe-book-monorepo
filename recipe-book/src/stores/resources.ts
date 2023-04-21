import type { Resource } from '@/types/resources'
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useResourcesStore = defineStore('resources', () => {
  const resources = ref<Resource[]>([])

  function addResource(resource: Resource) {
    resources.value.push(resource)
  }

  function updateResource(resource: Resource) {
    const index = resources.value.findIndex((r) => r.id === resource.id)
    resources.value[index] = resource
  }

  function deleteResource(resource: Resource) {
    const index = resources.value.findIndex((r) => r.id === resource.id)
    resources.value.splice(index, 1)
  }

  return { resources, addResource, updateResource, deleteResource }
})
