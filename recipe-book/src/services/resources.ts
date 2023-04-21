import type { UpdateResourceDTO, NewResourceDTO, Resource } from '@/types'

export class ResourcesService {
  private static instance: ResourcesService
  private static readonly endpoint = 'http://localhost:3000/resources'
  private constructor() {}

  static getInstance(): ResourcesService {
    if (!ResourcesService.instance) {
      ResourcesService.instance = new ResourcesService()
    }
    return ResourcesService.instance
  }

  async getResources(): Promise<Resource[]> {
    const response = await fetch(ResourcesService.endpoint)
    return await response.json()
  }

  async getResource(id: number): Promise<Resource> {
    const response = await fetch(`${ResourcesService.endpoint}/${id}`)
    return await response.json()
  }

  async createResource(resource: NewResourceDTO): Promise<Resource> {
    const response = await fetch(ResourcesService.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(resource)
    })
    return await response.json()
  }

  async updateResource(resource: UpdateResourceDTO): Promise<Resource> {
    const response = await fetch(`${ResourcesService.endpoint}/${resource.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(resource)
    })
    return await response.json()
  }
}
