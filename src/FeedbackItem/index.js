/**
 *
 * FeedbackItem
 *
 */

import React from 'react'

class FeedbackItem extends React.PureComponent {
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
    const { notificationType } = this.props.notification

    const goAwayWaitTime = this.props.dismissAfter - TIMEOUT_GO_AWAY_ANIMATION
    this.goAwayTimeout = setTimeout(this.goAwayTimeoutCallback, goAwayWaitTime)

    this.dismissTiemout = setTimeout(() => {
      this.props.onDismiss()
    }, this.props.dismissAfter)

    this.activeTimeout = setTimeout(this.setState.bind(this, {
      isActive: true
    }))

    if (notificationType === 'redirect' && this.feedbackItemRef) {
      this.feedbackItemRef.style.animationDuration = `${goAwayWaitTime / 1000}s`
    }
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
      browserHistory.push(notification.redirectUrl)
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
    }, TIMEOUT_REMOVE_COMPONENT)
  }

  renderCloseRetryBtn(actionIconClass, message) {
    return (
      <button
        onClick={this.handleClick}
        className={`actionBtn ${localStyle.actionBtn} ${actionIconClass}`}
      >
        {message ?
          <FormattedMessage {...message} />
          : null
        }
      </button>
    )
  }

  renderGoAwayButton() {
    return (
      <button
        onClick={this.goAwayTimeoutCallback}
        className={`actionBtn ${localStyle.actionBtn}`}
      >
        <FormattedMessage {...messages.goNow} />
        &nbsp;<span className="fa fa-caret-right" />
      </button>
    )
  }

  renderFeedbackItem(config) {
    const message = (Object.hasOwnProperty.call(this.props.notification.message, 'defaultMessage')) ?
      <FormattedMessage {...this.props.notification.message} /> :
      this.props.notification.message

    return (
      <div
        className={`
          notificationItem
          ${config.feedbackMainClass}
          ${this.getFeedbackClass()}
          ${this.state.isActive ? localStyle.isActive : localStyle.disapear}
        `}
        ref={this.saveFeedbackItemRef}
      >
        <div className={'row'}>
          <div className={`${config.messageClass} ${localStyle.notificationText}`}>
            {message}
          </div>
          <div className={`${config.actionBtnsClass} ${localStyle.actionButtons}`}>
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
    trace.debug('Rendering FeedbackItem Component')
    const type = this.props.notification.notificationType

    let feedbackItem
    switch (type) {
      case 'retry':
        feedbackItem = this.renderFeedbackItem({
          actionBtns: [this.renderCloseRetryBtn(`fa fa-undo ${commonStyle.reverseIcon}`)],
          feedbackMainClass: localStyle.narrowFeedbackItem,
          messageClass: 'col-xs-10',
          actionBtnsClass: 'col-xs-2',
        })
        break
      case 'redirect':
        feedbackItem = this.renderFeedbackItem({
          actionBtns: [
            this.renderGoAwayButton(),
            this.renderCloseRetryBtn('', messages.stay)
          ],
          feedbackMainClass: localStyle.redirectFeedbackItem,
          messageClass: 'col-xs-8',
          actionBtnsClass: 'col-xs-4',
        })
        break
      case 'largerSize':
        feedbackItem = this.renderCloseFeedbackType(localStyle.largeFeedbackItem)
        break
      default: // close type
        feedbackItem = this.renderCloseFeedbackType(localStyle.feedbackItem)
        break
    }

    return feedbackItem
  }
}

FeedbackItem.propTypes = {
  /*
   * Object containing notifications, this might come from the store under NotificationStack
   */
  notification: React.PropTypes.object,

  /*
   * Amount of time when a feedback item must dissapear, the default is 5s
   */
  dismissAfter: React.PropTypes.number,
  /*
   * dispatch function to redo a request
   */
  dispatch: React.PropTypes.func,
  /*
   * Function which will remove feedback items from the store
   */
  removeNotificationHandler: React.PropTypes.func,
  /*
   * Action to be performed when the time from dismissAfter goes on.
   */
  onDismiss: React.PropTypes.func,
}

export default FeedbackItem
