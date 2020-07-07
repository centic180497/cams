import * as types from '../constant/constant_actions'

export function getSingleViews(){
  return {
    type: types.GET_SINGLEVIEWS
  }
}

export function getSingleViewsSuccess({singleViews}){
  return {
    type: types.GET_SINGLEVIEWS_SUCCESS,
    singleViews: singleViews
  } 
}

export function getSingleViewsFailure(){
  return {
    type: types.GET_SINGLEVIEWS_FAILURE
  }
}

export function getView({viewId}){
  return {
    type: types.GET_VIEW,
    viewId
  }
}

export function getViewSuccess({currentView}){  
  return {
    type: types.GET_VIEW_SUCCESS,
    currentView: currentView
  }
}

export function getViewFailure(){
  return {
    type: types.GET_VIEW_FAILURE
  }
}

export function addView(newView){
  return {
    type: types.ADD_VIEW,
    newView: newView
  }
}

export function updateView(updatedView){
  return {
    type: types.UPDATE_VIEW
  }
}

