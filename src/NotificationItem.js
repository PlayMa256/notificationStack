import React from 'react'
import localStyle from './style.css'
class NotificationItem extends React.PureComponent {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.goAwayTimeoutCallback = this.goAwayTimeoutCallback.bind(this)
    this.saveFeedbackItemRef = this.saveFeedbackItemRef.bind(this)
    this.changeStatus = this.changeStatus.bind(this)
    this.state = {
      isActive: false
    }
  }

  /* istanbul ignore next */
  componentDidMount() {
    // const { notificationType } = this.props.notification

    // const goAwayWaitTime = this.props.dismissAfter - 2000
    // this.goAwayTimeout = setTimeout(this.goAwayTimeoutCallback, goAwayWaitTime)

    // this.dismissTiemout = setTimeout(() => {
    //   this.props.onDismiss()
    // }, this.props.dismissAfter)

    // this.activeTimeout = setTimeout(this.setState.bind(this, {
    //   isActive: true
    // }))

    // if (notificationType === 'redirect' && this.feedbackItemRef) {
    //   this.feedbackItemRef.style.animationDuration = `${goAwayWaitTime / 1000}s`
    // }
  }

  /* istanbul ignore next */
  componentWillReceiveProps(nextProps) {
    if (nextProps.dismissAfter === false) {
      return
    }

    if (!Object.hasOwnProperty.call(nextProps, 'isLast')) {
      clearTimeout(this.dismissTimeout)
    }
  }

  /* istanbul ignore next */
  componentWillUnmount() {
    clearTimeout(this.dismissTimeout)
    clearTimeout(this.goAwayTimeout)
  }

  getFeedbackClass() {
    const feedback = this.props.notification.feedback
    const feedbackDict = {
      good: localStyle.good,
      neutral: localStyle.neutral,
      bad: localStyle.bad,
    }
    return feedbackDict[feedback] || feedbackDict.neutral
  }

  saveFeedbackItemRef(node) {
    this.feedbackItemRef = node
  }

  goAwayTimeoutCallback() {
    const { notification } = this.props
    const { isActive } = this.state
    if (notification.notificationType === 'redirect' && isActive) {
      console.log('hi')
    }
    this.changeStatus()
  }

  changeStatus() {
    this.setState({
      isActive: false
    })
  }

  retryRequestHandler() {
    this.props.dispatch(this.props.notification.actionToPerform)
    this.changeStatus()
    this.props.removeNotificationHandler()
  }

  handleClick() {
    if (this.props.notification.notificationType === 'retry') {
      if (!this.props.notification.actionToPerform || this.props.notification.actionToPerform === undefined) {
        return
      }
      this.retryRequestHandler()
    }
    // It will be a remove action when the type defined is not equal to retry
    this.changeStatus()
    setTimeout(() => {
      this.props.removeNotificationHandler()
    }, 1000)
  }

  renderCloseRetryBtn(actionIconClass, message) {
    return (
      <button
        onClick={this.handleClick}
        className={`actionBtn ${localStyle.actionBtn} ${actionIconClass}`}
      >
        {message ?
          message
          : null
        }
      </button>
    )
  }

  renderFeedbackItem(config) {
    const message = this.props.notification.message
    return (
      <div className={` notificationItem ${this.getFeedbackClass()} ${this.state.isActive ? localStyle.isActive : localStyle.disapear}`}
      >
        <div className={'row'}>
          <div className={`${localStyle.notificationText}`}>
            {message}
          </div>
          <div className={`${localStyle.actionButtons}`}>
            {
              config.actionBtns.map((button, index) => {
                return <span key={index}>{button}</span>
              })
            }
          </div>
        </div>
      </div>
    )
  }

  renderCloseFeedbackType(feedbackMainClass) {
    return (
      this.renderFeedbackItem({
        actionBtns: [this.renderCloseRetryBtn('fa fa-close')],
        feedbackMainClass,
        messageClass: 'col-xs-10',
        actionBtnsClass: 'col-xs-2',
      })
    )
  }

  render() {
    console.log(this.props);
    return null;
  }
}

export default NotificationItem
