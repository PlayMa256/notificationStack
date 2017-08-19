/*
 *
 * NotificationStack reducer
 *
 */

import { fromJS } from 'immutable'
import { ADD_NOTIFICATION, NOTIFICATION_REMOVING_SUCCESS, NOTIFICATION_REMOVING_FAILURE } from './constants'
import messages from 'containers/App/messages'

const initialState = fromJS({
  count: 0,
  notifications: [],
  status: null
})

function notificationStackReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_NOTIFICATION: {
      const newCount = state.get('count') + 1
      const newAction = Object.assign({}, action) // copying object in order to insert a key element and delete the action type
      newAction.key = newCount // updating the amount of notifications
      delete newAction.type // removing the type content, which doesnt metter for the notification anyways
      return state.update('notifications', (notificationList) => notificationList.push(newAction)).set('count', newCount)
    }
    case NOTIFICATION_REMOVING_SUCCESS: {
      const notifications = state.get('notifications').toJS()
      const notificationPosition = notifications.findIndex((notification) => notification.key === action.key)
      return state.update('notifications', (notificationList) => {
        const remainNotifications = notificationList.delete(notificationPosition)
        return remainNotifications
      })
    }
    case NOTIFICATION_REMOVING_FAILURE: {
      return state.merge(fromJS({
        status: messages.sendRequestError.defaultMessage
      }))
    }
    default:
      return state
  }
}

export default notificationStackReducer
