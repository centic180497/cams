import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
// import { logger } from 'redux-logger'
import { createLogger } from 'redux-logger'
import rootSaga from '../sagas'
import { loadFollowlistData, loadUserData } from '../utils/localStorage'
import reducer_root from '../reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const sagaMiddleware = createSagaMiddleware()

const preloadedState = {
  user: {
    authenticated: Boolean(
      loadUserData() !== undefined && loadUserData().access_token !== undefined,
    ),
    user: loadUserData(),
    errors: {},
    isFetching: false,
  },
  // followList: {
  //   cameras: [],

  //   currentPage: 1,
  //   listSize: 9,
  // },
}

const logger = createLogger({
  collapsed: true,
})

const store = createStore(
  reducer_root,
  // preloadedState,
  // composeEnhancers(applyMiddleware(sagaMiddleware, logger)),
  composeEnhancers(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(rootSaga)

export default store
