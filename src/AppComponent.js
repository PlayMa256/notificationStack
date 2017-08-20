import React from 'react'
import { connect } from 'react-redux';
import { addNotification } from './actions/notification'
class AppComponent extends React.Component {
    constructor(props) {
        super(props);
        this.addNewNotification = this.addNewNotification.bind(this);
    }

    addNewNotification() {
        this.props.dispatch(addNotification({
            dismissAfter: 5000,
            message: "Teste",

        }))
    }
}

const mapStateToProps = (state) => {
    return {
        notifications: state.notifications
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);
