import FeedbackItem from '../index'
import expect from 'expect'
import { shallow } from 'enzyme'
import React from 'react'
import { browserHistory } from 'react-router'

describe('<FeedbackItem />', () => {
  const props = {
    dismissAfter: 'test',
    notification: {
      message: 'test',
      notificationType: 'test',
      feedback: 'test',
      isLast: 'test',
      key: 'test'
    },
    onDismiss: () => {},
    dispatch: () => {},
    removeNotificationHandler: () => {}
  }

  const buildFeedbakItem = (newProps = props) => {
    return shallow(<FeedbackItem {...newProps} />)
  }

  it('Should render the component', () => {
    const renderedComponent = buildFeedbakItem()
    expect(renderedComponent).toExist()
  })

  it('Rendering component with retry action instead of close and expect retryRequest and removeNotificationHandler to be called', () => {
    const props2 = {
      dismissAfter: 'test',
      notification: {
        message: 'test',
        notificationType: 'retry',
        feedback: 'test',
        isLast: 'test',
        key: '3',
        actionToPerform: 'test'
      },
      onDismiss: () => {},
      dispatch: () => {},
      removeNotificationHandler: () => {}
    }
    props2.dispatch = expect.createSpy()
    props2.removeNotificationHandler = expect.createSpy()
    const renderedComponent = buildFeedbakItem(props2)
    const componentInstance = renderedComponent.instance()
    componentInstance.handleClick()
    expect(props2.dispatch).toHaveBeenCalled()
    expect(props2.removeNotificationHandler).toHaveBeenCalled()
  })

  it('Rendering component with retry action and actionToPerform undefined', () => {
    const props2 = {
      dismissAfter: 'test',
      notification: {
        message: 'test',
        notificationType: 'retry',
        feedback: 'test',
        isLast: 'test',
        key: '3',
        actionToPerform: undefined
      },
      onDismiss: () => {},
      dispatch: () => {},
      removeNotificationHandler: () => {}
    }
    props2.dispatch = expect.createSpy()
    props2.removeNotificationHandler = expect.createSpy()
    const renderedComponent = buildFeedbakItem(props2)
    const componentInstance = renderedComponent.instance()
    componentInstance.handleClick()
    expect(props2.dispatch).toNotHaveBeenCalled()
    expect(props2.removeNotificationHandler).toNotHaveBeenCalled()
  })

  it('Rendering component with a message to FormattedMessage', () => {
    const props2 = {
      dismissAfter: 'test',
      notification: {
        message: {
          defaultMessage: 'teste',
          id: 'test'
        },
        notificationType: 'retry',
        feedback: 'test',
        isLast: 'test',
        key: '3',
        actionToPerform: undefined
      },
      onDismiss: () => {},
      dispatch: () => {},
      removeNotificationHandler: () => {}
    }
    const renderedComponent = buildFeedbakItem(props2)
    expect(renderedComponent).toExist()
  })

  it('Rendering component with close action and expect removeNotificationHandler to be called ', () => {
    const props2 = {
      dismissAfter: 'test',
      notification: {
        message: 'test',
        notificationType: 'close',
        feedback: 'test',
        isLast: 'test',
        key: '3',
        actionToPerform: 'test'
      },
      onDismiss: () => {},
      dispatch: () => {},
      removeNotificationHandler: () => {}
    }
    props2.removeNotificationHandler = expect.createSpy()
    const renderedComponent = buildFeedbakItem(props2)
    const componentInstance = renderedComponent.instance()
    componentInstance.handleClick()
    renderedComponent.update()
    setTimeout(() => {
      expect(props2.removeNotificationHandler).toHaveBeenCalled()
    }, 2000)
  })

  it('should make the notification dissapear', () => {
    const renderedComponent = buildFeedbakItem()
    const componentInstance = renderedComponent.instance()
    componentInstance.changeStatus()
    expect(componentInstance.state.isActive).toEqual(false)
  })

  it('should save the node in the instance', () => {
    const instance = buildFeedbakItem().instance()
    instance.saveFeedbackItemRef('mynode')
    expect(instance.feedbackItemRef).toEqual('mynode')
  })

  it('should call changeStatus on goAwayTimeoutCallback', () => {
    const changeStatusSpy = expect.spyOn(FeedbackItem.prototype, 'changeStatus')
    const instance = buildFeedbakItem().instance()

    instance.goAwayTimeoutCallback()
    expect(changeStatusSpy).toHaveBeenCalled()
    changeStatusSpy.restore()
  })

  it('should call browserHistory.push if notification type is redirect on goAwayTimeoutCallback', () => {
    const myprops = {
      notification: {
        notificationType: 'redirect',
        message: 'test',
      },
    }
    const browserHistorySpy = expect.spyOn(browserHistory, 'push')
    const instance = buildFeedbakItem(myprops).instance()
    instance.setState({ isActive: true })

    instance.goAwayTimeoutCallback()
    expect(browserHistorySpy).toHaveBeenCalled()
    browserHistorySpy.restore()
  })
})
