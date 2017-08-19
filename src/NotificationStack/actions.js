/*
 *
 * NotificationStack actions
 *
 */

import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION,
  NOTIFICATION_REMOVING_SUCCESS,
  NOTIFICATION_REMOVING_FAILURE,
  RETRY_REQUEST
} from './constants'

export function addNotification(notificationType = 'close',
                                message,
                                feedback = 'neutral',
                                actionToPerform,
                                dismissAfter = 5000,
                                redirectUrl) {
  return {
    type: ADD_NOTIFICATION,
    notificationType,
    message,
    feedback,
    actionToPerform,
    dismissAfter,
    redirectUrl
  }
}

export function removeNotification(key) {
  return {
    type: REMOVE_NOTIFICATION,
    key
  }
}

export function notificationRemovedSuccess(key) {
  return {
    type: NOTIFICATION_REMOVING_SUCCESS,
    key
  }
}

export function notificationRemovedFailure() {
  return {
    type: NOTIFICATION_REMOVING_FAILURE
  }
}

export function retryRequest(action) {
  return {
    type: RETRY_REQUEST,
    action
  }
}
