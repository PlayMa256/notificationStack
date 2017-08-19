import expect from 'expect'
import {
  addNotification,
  removeNotification,
  notificationRemovedSuccess,
  notificationRemovedFailure,
  retryRequest
} from '../actions'
import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION,
  NOTIFICATION_REMOVING_SUCCESS,
  NOTIFICATION_REMOVING_FAILURE,
  RETRY_REQUEST
} from '../constants'

describe('NotificationStack actions', () => {
  it('should have action type of `ADD_NOTIFICATION`', () => {
    const expected = {
      type: ADD_NOTIFICATION,
      notificationType: 'close',
      message: 'hahaha',
      feedback: 'neutral',
      actionToPerform: 'test',
      dismissAfter: 5000,
      redirectUrl: undefined,
    }
    expect(addNotification('close', 'hahaha', 'neutral', 'test', 5000)).toEqual(expected)
  })
  it('should have action type of `ADD_NOTIFICATION` using default values', () => {
    const expected = {
      type: ADD_NOTIFICATION,
      notificationType: 'close',
      message: 'hahaha',
      feedback: 'neutral',
      actionToPerform: 'test',
      dismissAfter: 5000,
      redirectUrl: undefined,
    }
    expect(addNotification(undefined, 'hahaha', undefined, 'test', undefined)).toEqual(expected)
  })
  it('should have action type of `REMOVE_NOTIFICATION`', () => {
    const expected = {
      type: REMOVE_NOTIFICATION,
      key: '123'
    }
    expect(removeNotification('123')).toEqual(expected)
  })
  it('should have action type of `NOTIFICATION_REMOVING_SUCCESS`', () => {
    const expected = {
      type: NOTIFICATION_REMOVING_SUCCESS,
      key: '2'
    }
    expect(notificationRemovedSuccess('2')).toEqual(expected)
  })

  it('should have action type of `NOTIFICATION_REMOVING_FAILURE`', () => {
    const expected = {
      type: NOTIFICATION_REMOVING_FAILURE,
    }
    expect(notificationRemovedFailure()).toEqual(expected)
  })

  it('should have action type of `RETRY_REQUEST`', () => {
    const expected = {
      type: RETRY_REQUEST,
      action: 'test'
    }
    expect(retryRequest('test')).toEqual(expected)
  })
})
