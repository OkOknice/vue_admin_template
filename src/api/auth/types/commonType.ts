export interface ICommonResponseResult {
  code: number
  message: string
  ok: boolean
}

export interface IResData extends ICommonResponseResult {
  data?: null
}
