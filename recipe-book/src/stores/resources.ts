import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useTrpc } from '@/composables/trpc'
import type { Resource } from '@/types/resource'
import type {
  CreateResourceDTO,
  ResourceDTO,
  UpdateResourceDTO
} from '../../../recipe-book-api/src/router/resource'

export const useResourcesStore = defineStore('resources', () => {
  const resources = ref<Resource[]>([])
  const { trpc } = useTrpc()

  const getResources = async () => {
    resources.value = await trpc.resource.getAll.query()
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
  return { resources, getResources, addResource, updateResource }
})
