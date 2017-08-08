import {Map, List} from 'immutable';
// import {createStore} from 'redux';
import {connect, Provider} from 'react-redux'
import React from 'react';

const Counter = ({value, onIncrement, onDecrement}) => (
    <div>
        {value}
        <button onClick={onIncrement}>+</button>
        <button onClick={onDecrement}>-</button>
    </div>
);


class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        //let {dispatch} = this.props
    }

    render() {
        console.log(this.props)
        let {dispatch, count} = this.props
        return (
            <div>
                Hello,Home
                <Counter
                    value={count}
                    onIncrement={
                        () => {
                            dispatch({type: 'INCREMENT'})
                        }
                    }
                    onDecrement={
                        () => {
                            dispatch({type: 'DECREMENT'})
                        }
                    }/>
            </div>
        );
    }
}

export default connect(
    (state) => (state)
)(Home)

