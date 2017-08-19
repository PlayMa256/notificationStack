import { selectNotifications } from '../selectors'
import { fromJS } from 'immutable'
import expect from 'expect'

describe('selectNotificationStackDomain', () => {
  it('should select all the notifications', () => {
    const mockedState = fromJS({
      notificationStack: {
        notifications: [1, 2, 3, 4]
      }
    })
    expect(selectNotifications()(mockedState)).toEqual([1, 2, 3, 4])
  })
  it('should return empty array', () => {
    const mockedState = fromJS({
      notificationStack: {
        notifications: undefined
      }
    })
    expect(selectNotifications()(mockedState)).toEqual([])
  })
})
