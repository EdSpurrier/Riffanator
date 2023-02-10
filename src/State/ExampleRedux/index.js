import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, signIn } from './actions';


const ExampleRedux = memo((props) => {

    const counter = useSelector(state => state.counter);
    const isLogged = useSelector(state => state.logged);
    const dispatch = useDispatch();


    return (
        <div>
            <h1>Counter {counter}</h1>
            <button onClick={() => dispatch(increment(5))}>+</button>
            <button onClick={() => dispatch(decrement())}>-</button>
            <hr />

            <hr />
            <button onClick={() => dispatch(signIn())}>Log In</button>
            Counter more than 10: {counter > 10?'true':'false'} <br />
            {isLogged ? <h3>Info cant see unless logged in....</h3> : ''}
            <hr />

        </div>
    )
});

ExampleRedux.displayName = 'ExampleRedux';

ExampleRedux.propTypes = {};

export default ExampleRedux;