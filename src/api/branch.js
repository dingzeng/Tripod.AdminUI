import request from '@/utils/request'
import qs from 'qs'

export function query(params) {
  return new Promise(function(resolve, reject){
    request({
      url: '/archive/branchs?' + qs.stringify(params),
      method: 'get'
    }).then(response => {
      resolve({
        list: response.data.branchs,
        totalCount: response.data.totalCount
      })
    }).catch(error => {
      reject(error)
    })
  })
}