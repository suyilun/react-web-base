// import { Route} from 'react-router';
import {HashRouter as Router, BrowserRouter, Switch, Link, Route, Redirect} from 'react-router-dom';
import {PostLayout, IndexLayout} from "../Layout/AppLayouts";
import Home from "../Component/Home/Home";
import React from 'react';

//类似frame模板
const FrameRouter = () => (
    <Router>
        <Switch>
            <IndexLayout exact path='/' component={Home}/>
            <PostLayout path="/home" component={Home}/>
            <Route path="/tacos" component={Tacos}/>
        </Switch>
    </Router>
)

const Tacos = ({match}) => {
    console.log("Tacos url ", match.url)
    (
        <div>
            <Redirect to="/home"/>
        </div>
    )
}

//简单单页面
const SimpleRouter = () => {
    return (
        <Router forceRefresh={false}>
        </Router>
    );
}


module.exports = {FrameRouter, SimpleRouter};



