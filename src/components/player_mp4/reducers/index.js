import player from './player'
import operation from './operation'

export default function (state = {}, action) {
  // if (
  //   action.type !== 'USER_ACTIVATE' &&
  //   action.type !== 'PLAYER_ACTIVATE' &&
  //   action.type !== 'CONTROL_BAR_ACTIVATE'
  // ) {
  //   console.log(action)
  // }
  return {
    player: player(state.player, action),
    operation: operation(state.operation, action),
  }
}

export const playerReducer = player
export const operationReducer = operation
