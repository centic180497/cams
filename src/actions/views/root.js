import * as UserActions from 'actions/action_user'

export function loadMeAndConfig() {
  return async dispatch => {
    const resolvedPromises = []

    const user = localStorage.getItem('USER')

    if (user) {
      resolvedPromises.push(await dispatch(UserActions.loadMe()))
    }

    return resolvedPromises
  }
}
