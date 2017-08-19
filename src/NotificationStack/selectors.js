import { createSelector } from 'reselect'

/**
 * Direct selector to the notificationStack state domain
 */
const selectNotificationStackDomain = () => (state) => state.get('notificationStack')

const selectNotifications = () => createSelector(
  selectNotificationStackDomain(),
  (substate) => {
    const notifications = substate.get('notifications')
    return (notifications) ? notifications.toJS() : []
  }
)

export {
  selectNotifications,
}
