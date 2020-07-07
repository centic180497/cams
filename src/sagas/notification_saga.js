import { eventChannel, END, delay } from 'redux-saga'
import {
  takeEvery,
  apply,
  put,
  call,
  fork,
  take,
  cancel,
  cancelled,
  select,
} from 'redux-saga/effects'
import _ from 'lodash'
import * as NotificationApi from 'api/notification'
import { WS_URL } from 'constant/constant_endpoint'
import {
  pushNotification,
  fetchNotificationSuccess,
  readMessageSuccess,
} from 'actions/action_notification'
import { enqueueSnackbar } from 'actions/action_snackbar';
import { WebSocketClient } from 'client'

function createWebSocketConnection() {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(WS_URL)
    socket.onopen = () => {
      resolve(socket)
    }
    socket.onclose = event => {
      reject(event)
    }
  })
}

function createSocketChannel(socket) {
  return eventChannel(emit => {
    socket.onmessage = event => {
      emit(JSON.parse(event.data))
    }
    socket.onclose = () => {
      console.log('Websocket closed')
      emit('close_websocket')
    }
    socket.onerror = () => {
      console.log('Websocket error')
      emit(END)
    }
    const unsubscribe = () => {
      socket.onmessage = null
    }
    return unsubscribe
  })
}

export function* workerConnectToNotification() {
  // const socketTask = yield fork(listenForSocketMessages)
}

let socket, socketChannel
// function* listenForSocketMessages() {
//   try {
//     socket = yield call(createWebSocketConnection)
//     // console.log(socket)
//     // console.log( WebSocketClient.conn)
//     // socketChannel = yield call(createSocketChannel, socket)
//     while (true) {
//       try {
//         const payload = yield take(socketChannel)
//         if (payload.type === 'blacklist') {
//           yield put(pushNotification(payload.data))
//           yield put(enqueueSnackbar({
//             message: `Phát hiện phương tiện ${payload.data.plate_number}`,
//             // options: {
//             //   variant: 'info'
//             // }
//           }))
//         }
//       } catch (error) {}
//     }
//   } catch (error) {}
// }

export function* workerFetchNotification() {
  try {
    const { data } = yield call(NotificationApi.fetchNotification)
    yield put(fetchNotificationSuccess(data.data))
  } catch (error) {}
}

export function* workerReadMessage(action) {
  try {
    const { data } = yield call(NotificationApi.readMessage, action.id)
    yield put(readMessageSuccess(data.data))
  } catch (error) {}
}
