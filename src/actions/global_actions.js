import _ from 'lodash'
import store from '../store'
import {loadMe } from 'actions/action_user'

const dispatch = store.dispatch
const getState = store.getState

export async function redirectUserToDashboard(){
  let state = getState()

  let user = state.user.user

  if(_.isEmpty(user)){
    await dispatch(loadMe())
    
    user = state.user.user
  }

  if(_.isEmpty(user)) return
}

