/**
 * Test  sagas
 */

import expect from 'expect'
import { put, select } from 'redux-saga/effects'
import { removeNotification, triggerFeedback } from '../sagas'
import { selectNotifications } from '../selectors'
import * as actions from '../actions'

// const generator = defaultSaga()

describe('NotificationStack Sagas', () => {
  it('should call a select on selectNotifications', () => {
    const action = {
      key: 33
    }
    const removeNotificationGenerator = removeNotification(action)
    expect(removeNotificationGenerator.next().value).toEqual(select(selectNotifications()))
  })
  it('should call a put on notificationRemovedSuccess', () => {
    const action = {
      key: 33
    }
    const returned = [{
      notificationType: 'close',
      message: 'teste',
      feedback: 'good',
      onClickHandler: 'dasd',
      dismissAfter: 5000,
      key: 33
    },
      {
        notificationType: 'close',
        message: 'teste',
        feedback: 'good',
        onClickHandler: 'dasd',
        dismissAfter: 5000,
        key: 2
      }]
    const removeNotificationGenerator = removeNotification(action)
    removeNotificationGenerator.next()
    expect(removeNotificationGenerator.next(returned).value).toEqual(put(actions.notificationRemovedSuccess(33)))
  })

  it('should call a put on notificationRemovedFailure', () => {
    const action = {
      key: 10
    }
    const returned = [{
      notificationType: 'close',
      message: 'teste',
      feedback: 'good',
      onClickHandler: 'dasd',
      dismissAfter: 5000,
      key: 33
    },
      {
        notificationType: 'close',
        message: 'teste',
        feedback: 'good',
        onClickHandler: 'dasd',
        dismissAfter: 5000,
        key: 2
      }]
    const removeNotificationGenerator = removeNotification(action)
    removeNotificationGenerator.next()
    expect(removeNotificationGenerator.next(returned).value).toEqual(put(actions.notificationRemovedFailure()))
  })

  it('should call a put on addNotification when calling triggerFeedback', () => {
    const removeNotificationGenerator = triggerFeedback(
      true,
      'action',
      'success',
      null,
      null,
      'redirectUrl')
    expect(removeNotificationGenerator.next().value).toEqual(put(actions.addNotification(
      'redirect',
      'success',
      'good',
      'action',
      null,
      'redirectUrl')))
  })

  it('should call a put on addNotification when calling triggerFeedback without redirectUrl', () => {
    const removeNotificationGenerator = triggerFeedback(
      true,
      'action',
      'success',
      null,
      null,
      null)
    expect(removeNotificationGenerator.next().value).toEqual(put(actions.addNotification(
      'close',
      'success',
      'good',
      'action',
      null,
      null)))
  })

  it('should call a put on addNotification when calling triggerFeedback with failure', () => {
    const removeNotificationGenerator = triggerFeedback(
      false,
      'action',
      null,
      'failure',
      null,
      null)
    expect(removeNotificationGenerator.next().value).toEqual(put(actions.addNotification(
      'retry',
      'failure',
      'bad',
      'action',
      null,
      null)))
  })
})
