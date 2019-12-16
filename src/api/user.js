import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/userinfo',
    method: 'get',
    params: { token }
  })
}

export function logout(token) {
  return request({
    url: '/logout',
    method: 'post',
    data: {
      token
    }
  })
}

export function getUserRoles(userId) {
  return request({
    url: '/system/user/role/' + userId,
    method: 'get'
  })
}

export function updateUserRoles(userId, roleIdList) {
  return request({
    url: '/system/user/role',
    data: {
      userId,
      roleIdList
    },
    method: 'put'
  })
}
