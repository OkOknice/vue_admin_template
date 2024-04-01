import client from '..'
import { IResData } from './types/commonType'
import { IMenuList } from './types/roleType'

enum MENU_API {
  GET_MENU_API = '/admin/acl/permission',
  DELETE_MENU_API = '/admin/acl/permission/remove',
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
