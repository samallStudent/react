import React from 'react';

import {HashRouter as Router, Route, Switch, Link,  } from 'react-router-dom';
// import { Router, Route, Link } from 'react-router';

import Bundle from './Bundle';

import Home from 'bundle-loader?lazy&name=home!pages/Home/index';
import Page1 from 'bundle-loader?lazy&name=page1!pages/Page1/index';
import Counter from 'bundle-loader?lazy&name=counter!pages/Counter/index';
import UserInfo from 'bundle-loader?lazy&name=userInfo!pages/UserInfo/index';

const Loading = () => <div>Loading</div>;

const createComponent = (component) => (props) => (
    <Bundle load={component}>
        {
            (Component) => Component ? <Component {...props} /> : <Loading/>
        }
    </Bundle>
)

const getRouter = () => (
    <Router>
       <div>
            <ul>
                <li><Link to="/">首页</Link></li>
                <li><Link to="/page1">Page1</Link></li>
                <li><Link to="/counter">Counter</Link></li>
                <li><Link to="/userInfo">UserInfo</Link></li>
            </ul>
            <Switch>
                <Route exact path="/" component={createComponent(Home)}/>
                <Route path="/page1" component={createComponent(Page1)}/>
                <Route path="/counter" component={createComponent(Counter)}/>
                <Route path="/userInfo" component={createComponent(UserInfo)}/>
            </Switch>
       </div>
   </Router>
);

export default getRouter;
