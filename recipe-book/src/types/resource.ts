export type Unit = 'G' | 'ML' | 'PCS'
export interface Resource {
  id: number
  name: string
  description: string | null
  img: string | null
  unit: Unit
  amount: number
}
