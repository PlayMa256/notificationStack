import uuid from 'uuid/v4'
import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from '../constants'
const defaultState = {
  notifications: []
}
export default function(state = defaultState, action) {
  switch (action.type) {
    case ADD_NOTIFICATION:
      {
        return { ...state, notifications: [{ ...state.notifications, id: uuid() }, action.data] }
      }
    case REMOVE_NOTIFICATION:
      {
        const notificationIdx = state.notifications.findIndex((notification) => notification.id === action.data)
        return { ...state,
          notifications: [...state.notifications.slice(0, notificationIdx),
            ...state.items.slice(notificationIdx + 1)
          ]
        }
      }
    default:
      {
        return state;
      }
  }
}
