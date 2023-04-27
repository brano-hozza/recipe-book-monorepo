import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useTrpc } from '@/composables/trpc'
import type { Resource, CreateResourceDTO, ResourceDTO, UpdateResourceDTO } from '@/types'

export const useResourcesStore = defineStore('resources', () => {
  const resources = ref<Resource[]>([])
  const { trpc } = useTrpc()

  const getResources = async () => {
    resources.value = (await trpc.resource.getAll.query()).reduce((acc, resource) => {
      if (resource !== null) acc.push(resource)
      return acc
    }, [] as Resource[])
  }

  const addResource = async (resource: CreateResourceDTO) => {
    const resourceData: ResourceDTO = await trpc.resource.create.mutate(resource)
    resources.value.push(resourceData)
  }

  const updateResource = async (resource: UpdateResourceDTO) => {
    const resourceData: ResourceDTO = await trpc.resource.update.mutate(resource)
    const index = resources.value.findIndex((r) => r.id === resourceData.id)
    resources.value[index] = resourceData
  }

  const deleteResource = async (id: number) => {
    await trpc.resource.delete.mutate(id)
    const index = resources.value.findIndex((r) => r.id === id)
    resources.value.splice(index, 1)
  }

  return { resources, getResources, addResource, updateResource, deleteResource }
})
