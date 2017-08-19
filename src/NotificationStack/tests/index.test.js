import { NotificationStack } from '../index'

import expect from 'expect'
import { shallow } from 'enzyme'
import React from 'react'

describe('<NotificationStack />', () => {
  const props = {
    notifications: [],
  }

  const buildStack = (newProps = props) => {
    return shallow(<NotificationStack {...newProps} />)
  }

  it('should render the component', () => {
    props.removeNotification = expect.createSpy()
    const renderedComponent = buildStack()
    expect(renderedComponent).toExist()
  })

  it('should render the component with no notifications', () => {
    const newProps = {}
    newProps.removeNotification = expect.createSpy()
    const renderedComponent = buildStack(newProps)
    expect(renderedComponent).toExist()
  })

  it('rendering component with notifications but with no dismissAfter Property', () => {
    const newProps = {
      notifications: [
        {
          notificationType: 'close',
          message: 'teste',
          feedback: 'good',
          onClickHandler: 'dasd',
          key: 1
        }],
    }
    newProps.removeNotification = expect.createSpy()
    const renderedComponent = buildStack(newProps)
    expect(renderedComponent).toExist()
  })
  it('rendering component with notifications containing dismissAfter Property but equal to null', () => {
    const newProps = {
      notifications: [
        {
          notificationType: 'close',
          message: 'teste',
          feedback: 'good',
          onClickHandler: 'dasd',
          key: 1,
          dismissAfter: null
        }],
    }
    newProps.removeNotification = expect.createSpy()
    const renderedComponent = buildStack(newProps)
    expect(renderedComponent).toExist()
  })

  it('rendering component with notifications containing dismissAfter Property and more than one notification', () => {
    const newProps = {
      notifications: [
        {
          notificationType: 'close',
          message: 'teste',
          feedback: 'good',
          onClickHandler: 'dasd',
          key: 1,
          dismissAfter: 4000
        },
        {
          notificationType: 'close',
          message: 'teste',
          feedback: 'good',
          onClickHandler: 'dasd',
          key: 2,
          dismissAfter: 500
        }
      ],
    }
    newProps.removeNotification = expect.createSpy()
    const renderedComponent = buildStack(newProps)
    expect(renderedComponent).toExist()
  })
})
