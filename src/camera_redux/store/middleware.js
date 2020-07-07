import thunk from 'redux-thunk'

export function createMiddleware() {
  let middleware = []

  middleware.push(thunk)
  
  return middleware
}
