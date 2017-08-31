import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import * as Actions from '../../Actions/Actions';

const Demo1 = ({ count, onIncrement, onDecrement }) => (
  <div>
    计数示例：{count}
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </div>
);

Demo1.propTypes = {
  count: PropTypes.number,
  onIncrement: PropTypes.func,
  onDecrement: PropTypes.func,
};
Demo1.defaultProps = { count: 0, onIncrement: () => {}, onDecrement: () => {} };

const Demo2 = ({ text }) => (
  <div>使用boundActionCreators示例：{text}</div>
);
Demo2.propTypes = { text: PropTypes.string };
Demo2.defaultProps = { text: '' };

const Demo3 = ({ user }) => (
  <div>ajax 示例:{user ? `name is ${user.name} age is ${user.age}` : ''}</div>
);
Demo3.propTypes = { user: PropTypes.object };
Demo3.defaultProps = { user: null };

function mapStateToProps(state) {
  return { count: state.counter.count, text: state.todos.text, user: state.users.user };
}

class Home extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    action: PropTypes.object,
    count: PropTypes.number,
    text: PropTypes.string,
    user: PropTypes.object,
  };
  static defaultProps = {
    dispatch: () => {},
    action: null,
    count: 0,
    text: '',
    user: null,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const action = Actions.addTodo('Use Redux');
    dispatch(action);
    const userAction = Actions.fetchUser();
    dispatch(userAction);
  }

  render() {
    const { dispatch, count, text, user } = this.props;
    const boundActionCreators = bindActionCreators(Actions, dispatch);
    return (
      <div>
        Hello,Home
        <Demo1
          count={count}
          onIncrement={() => {
            dispatch({ type: 'INCREMENT' });
          }
          }
          onDecrement={() => {
            dispatch({ type: 'DECREMENT' });
          }}
        />
        <Demo2 text={text} {...boundActionCreators} />
        <Demo3 user={user} {...boundActionCreators} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Home);
