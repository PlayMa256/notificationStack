import { combineReducers } from 'redux'
import notificationReducer from './notification'

const app = combineReducers({
  notificationReducer
})

export default app