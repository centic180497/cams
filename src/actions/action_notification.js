import * as types from 'constant/constant_actions'
import actionCreator from '../utils/actionCreator'

export const fetchNotification = actionCreator(types.NOTIFICATION__FETCH)
export const fetchNotificationSuccess = actionCreator(
  types.NOTIFICATION__FETCH_SUCCESS,
  'payload',
)
export const fetchNotificationsFailure = actionCreator(
  types.NOTIFICATION__FETCH_FAILURE,
)
export const connectNotification = actionCreator(types.NOTIFICATION__CONNECT)

export const pushNotification = actionCreator(
  types.NOTIFICATION__PUSH,
  'payload',
)

export const unreadCount = actionCreator(types.NOTIFICATION__UNREAD_COUNT)

export const unreadCountSuccess = actionCreator(
  types.NOTIFICATION__UNREAD_COUNT_SUCCESS,
  'payload',
)

export const unreadCountFailure = actionCreator(
  types.NOTIFICATION__UNREAD_COUNT_FAILURE,
  'payload',
)

export const readMessage = actionCreator(
  types.NOTIFICATION__READ_MESSAGE, 
  'id'
)

export const readMessageSuccess = actionCreator(
  types.NOTIFICATION__READ_MESSAGE_SUCCESS,
  'payload'
)
