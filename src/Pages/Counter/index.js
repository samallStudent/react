import React, {Component} from 'react';
import {increment, decrement, reset} from 'actions/counter';


/*
connect就是使用 store.subscribe() 从 Redux state 树中读取部分数据，并通过 props 来把这些数据提供给要渲染的组件
*/
import {connect} from 'react-redux';

class Counter extends Component {
    render() {
        console.log(this.props);
        return (
            <div>
                <div>当前计数为{this.props.counter}</div>
                <button onClick={() => {
                    this.props.increment()
                }}>自增
                </button>
                <button onClick={() => {
                    this.props.decrement()
                }}>自减
                </button>
                <button onClick={() => {
                    this.props.reset()
                }}>重置
                </button>
            </div>
        );
    }
};



const mapStatetoProps = (state) => {
    console.log(state.counter);
    return {
        counter: state.counter.count
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        increment: () => {
            dispatch(increment())
        },
        decrement: () => {
            dispatch(decrement())
        },
        reset: () => {
            dispatch(reset())
        }
    }
};

/*
connect接收两个参数，一个mapStateToProps,就是把redux的state，转为组件的Props，还有一个参数是mapDispatchToprops,
*/
export default connect(mapStatetoProps, mapDispatchToProps)(Counter);
