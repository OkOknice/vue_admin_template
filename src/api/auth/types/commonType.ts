/**
 * @author OKOK
 * @date 2024-04-02
 * @desc 公用的类型定义
 */

export interface ICommonResponseResult {
  code: number
  message: string
  ok: boolean
}

export interface IResData extends ICommonResponseResult {
  data?: null
}
