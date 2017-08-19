import React from 'react';
import { connect } from 'react-redux';
import localStyle from './style.css'
import NotificationItem from './NotificationItem'

export class NotificationStack extends React.PureComponent {
  render() {
    return (
      <div className={`${localStyle.notificationList}`}>
        {(this.props.notifications || []).map((notification, index) => {
          const isLast = index === 0 && this.props.notifications.length === 1
          const dismissNow = isLast

          let { dismissAfter } = notification

          if (dismissAfter !== false) {
            if (dismissAfter == null) {
              dismissAfter = this.props.dismissAfter
            }
            if (!dismissNow) {
              dismissAfter += index * 1000
            }
          }
          return (
            <FeedbackItem
              notification={notification}
              dismissAfter={dismissAfter}
              dispatch={this.props.dispatch}
              removeNotificationHandler={this.props.removeNotification(notification.key)}
              onDismiss={this.props.removeNotification(notification.key)}
              isLast={isLast}
              key={notification.key}
            />
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    notifications: state.notifications
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NotificationStack)
