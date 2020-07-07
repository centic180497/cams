



import * as types from '../constant/constant_actions'

const INITIAL_STATE = {
  // search_cam:{
  //   string: '',
  //   province: null,
  //   district: null,
  //   commune: null,
  //   group: null,
  //   state_cam: null
  // }
}

const reducer_search = (state = INITIAL_STATE, action) => {
  switch (action.type){
    // case types.CHANGE_SEARCH_CAM_PARAMS:
    //   return Object.assign({}, state, {
    //     search_cam: {
    //       ...state.search_cam,
    //       ...action.payload
    //     }
    //   })
    default:
      return state
  }
}

export default reducer_search