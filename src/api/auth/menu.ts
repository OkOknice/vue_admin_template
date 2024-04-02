/**
 * @author OKOK
 * @date 2024-04-01
 * @desc 菜单 API 模块
 */

import client from '..'
import type { IResData } from './types/commonType'
import type { IMenuParams } from './types/menuType'
import type { IMenuList } from './types/roleType'

enum MENU_API {
  GET_MENU_API = '/admin/acl/permission',
  DELETE_MENU_API = '/admin/acl/permission/remove',
  ADD_MENU_API = '/admin/acl/permission/save',
  UPDATE_MENU_API = '/admin/acl/permission/update',
}

// 获取菜单
export const getMenuApi = () => {
  return client.get<IMenuList>({
    url: MENU_API.GET_MENU_API,
  })
}

// 删除菜单
export const deleteMenuApi = (id: number) => {
  return client.delete<IResData>({
    url: `${MENU_API.DELETE_MENU_API}/${id}`,
  })
}

// 添加菜单
export const addMenuApi = (data: IMenuParams) => {
  return client.post<IResData>({
    url: MENU_API.ADD_MENU_API,
    data,
  })
}

// 更新菜单
export const updateMenuApi = (data: IMenuParams) => {
  return client.put<IResData>({
    url: MENU_API.UPDATE_MENU_API,
    data,
  })
}
