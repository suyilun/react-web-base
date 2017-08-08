import {bindActionCreators} from 'redux';
import ActionTypes from "../../Actions/ActionTypes"
import {connect} from 'react-redux'
import React from 'react';
import * as Actions from '../../Actions/Actions';

const Demo1 = ({count, onIncrement, onDecrement}) => (
    <div>
        计数示例：{count}
        <button onClick={onIncrement}>+</button>
        <button onClick={onDecrement}>-</button>
    </div>
);


const Demo2 = ({text}) => {
    return (<div>使用boundActionCreators示例：{text}</div>)
}

const Demo3 = ({user}) => {
    return (<div>ajax 示例: {user ? `name is ${user.name} age is ${user.age}` : ""}</div>)
}

function mapStateToProps(state) {
    return {
        count: state.counter.count,
        text: state.todos.text,
        user: state.users.user
    }
}


class Home extends React.Component {
    constructor(props) {
        super(props);
        // console.log(this.context);
        // const {store} = this.context;
        // console.log("store:", store)
    }

    componentDidMount() {
        //let {dispatch} = this.props
        // const {store} = this.context;
        // console.log("store", store);
        let {dispatch} = this.props;
        let action = Actions.addTodo('Use Redux');
        dispatch(action);
        let userAction = Actions.fetchUser();
        dispatch(userAction);
    }

    render() {
        let {dispatch, count, text, user} = this.props;
        let boundActionCreators = bindActionCreators(Actions, dispatch);
        return (
            <div>
                Hello,Home
                <Demo1
                    count={count}
                    onIncrement={
                        () => {
                            dispatch({type: 'INCREMENT'})
                        }}
                    onDecrement={
                        () => {
                            dispatch({type: 'DECREMENT'})
                        }
                    }/>
                <Demo2 text={text} {...boundActionCreators}/>
                <Demo3 user={user} {...boundActionCreators}/>
            </div>
        );
    }
}

export default connect(mapStateToProps
)(Home)

