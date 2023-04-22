export enum UNIT {
  G = 'G',
  ML = 'ML',
  PCS = 'PCS'
}
export interface Resource {
  id: number
  name: string
  description: string | null
  img: string | null
  unit: UNIT
  amount: number
}
