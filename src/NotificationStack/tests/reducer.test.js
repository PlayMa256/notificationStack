import expect from 'expect'
import notificationStackReducer from '../reducer'
import * as notificationActions from '../actions'
import { fromJS } from 'immutable'

describe('NotificationStack Reducer tests', () => {
  let initialState
  beforeEach(() => {
    initialState = fromJS({
      notificationStack: {
        count: undefined,
        notifications: [],
        status: undefined
      }
    })
  })
  it('returns the initial state', () => {
    expect(notificationStackReducer(initialState, {})).toEqual(fromJS({
      notificationStack: {
        count: undefined,
        notifications: [],
        status: undefined
      }
    }))
  })
  it('should have notifications when `ADD_NOTIFICATION` is called', () => {
    const newInitialState = fromJS({
      count: 0,
      notifications: [],
      status: null
    })
    const expected = {
      count: 1,
      notifications: [
        {
          notificationType: 'close',
          message: 'teste',
          feedback: 'good',
          actionToPerform: 'test',
          dismissAfter: 5000,
          key: 1,
          redirectUrl: undefined
        }
      ],
      status: null
    }
    expect(notificationStackReducer(newInitialState, notificationActions.addNotification('close', 'teste', 'good', 'test', 5000)).toJS()).toEqual(expected)
  })
  it('should have notifications removed when called with NOTIFICATION_REMOVING_SUCCESS', () => {
    const newInitialState = fromJS({
      count: 0,
      notifications: [{
        notificationType: 'close',
        message: 'teste',
        feedback: 'good',
        onClickHandler: 'dasd',
        dismissAfter: 5000,
        key: 1
      }],
      status: null
    })
    const expected = {
      count: 0,
      notifications: [],
      status: null
    }
    expect(notificationStackReducer(newInitialState, notificationActions.notificationRemovedSuccess('1')).toJS()).toEqual(expected)
  })
  it('should have status with an error message when you try to remove a notification that does not exist', () => {
    const newInitialState = fromJS({
      count: 1,
      notifications: [
        {
          notificationType: 'close',
          message: 'teste',
          feedback: 'good',
          dismissAfter: 5000,
          key: 1
        }
      ],
      status: undefined
    })
    const expected = {
      count: 1,
      notifications: [
        {
          notificationType: 'close',
          message: 'teste',
          feedback: 'good',
          dismissAfter: 5000,
          key: 1
        }
      ],
      status: 'There was an error sending the request.'
    }
    const action = notificationActions.notificationRemovedFailure()
    expect(notificationStackReducer(newInitialState, action).toJS()).toEqual(expected)
  })
})
