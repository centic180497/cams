import * as types from '../constant/constant_actions'
import actioCreator from '../utils/actionCreator'

export function logIn( user ) {
  return {
    type: types.LOGIN,
    user: user
  }
}

export function signUp(){
  return {

  }
}

export function logOut(){
  localStorage.removeItem('USER')
  return {
    type: types.LOG_OUT
  }
}