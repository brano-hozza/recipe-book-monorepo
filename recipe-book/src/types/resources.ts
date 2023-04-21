export interface Resource {
  id: number
  name: string
  category: string
  description?: string
  img?: string
  quantity: number
}

export interface NewResourceDTO {
  name: string
  category: string
  description?: string
  img?: string
}

export interface UpdateResourceDTO {
  id: number
  name: string
  category: string
  description?: string
  img?: string
}
