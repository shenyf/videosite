import { Notify } from 'quasar'
import {getIdentity} from '@/api/user'
/*
export function someAction (context) {
}
*/
export function reload({commit}){
  return new Promise((resolve, reject) =>{
    getIdentity().then(response => {
      // console.log(response)
      const data = response.data
      // console.info('get info in reload:', data)
      commit('updateIdentity', data)
      // commit('updateAccesses', data.permissions)
      resolve(response)
    }).catch(error =>{
      reject(error)
    })
  })
}
