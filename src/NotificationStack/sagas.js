import { put, select } from 'redux-saga/effects'
import { REMOVE_NOTIFICATION } from './constants'
import { notificationRemovedSuccess, notificationRemovedFailure, addNotification } from './actions'
import { selectNotifications } from './selectors'
import { takeLatest } from 'redux-saga'
import _ from 'lodash'
import messages from 'containers/App/messages'

export function* removeNotification(action) {
  const notifications = yield select(selectNotifications())
  const notificationId = action.key
  const remainNotifications = notifications.filter((n) => n.key !== notificationId)
  if (!_.isEqual(notifications, remainNotifications)) {
    yield put(notificationRemovedSuccess(notificationId))
  } else {
    yield put(notificationRemovedFailure())
  }
}

export function* triggerFeedback(requestStatus,
                                 action,
                                 messageSuccess,
                                 messageFailure = messages.retryRequestError,
                                 dismissAfter,
                                 redirectUrl) {
  let notificationType
  let message
  let feedback
  if (requestStatus) {
    notificationType = redirectUrl ? 'redirect' : 'close'
    message = messageSuccess
    feedback = 'good'
  } else {
    notificationType = 'retry'
    message = messageFailure
    feedback = 'bad'
  }

  yield put(addNotification(notificationType,
                            message,
                            feedback,
                            action,
                            dismissAfter,
                            redirectUrl))
}

export function* notificationStackListener() {
  yield [
    takeLatest(REMOVE_NOTIFICATION, removeNotification),
  ]
}

export default notificationStackListener
