export function addNotification(type = 'close', feedbackType = 'neutral', action = {}) {
  return {
    type: "ADD_NOTIFICATION",
    notification_type: type,
    feedbackType,
    action
  }
}