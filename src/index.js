import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, Link, hashHistory, browserHistory } from 'react-router';
import {Switch, Route, Redirect, NavLink} from 'react-router-dom'
import {ConnectedRouter} from 'react-router-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import store from './store'
import {Provider} from 'react-redux'
import './main.css'

import EventList from './components/EventList';
import EventDetail from './components/EventDetail';

class App extends React.Component {
    render(){
        return(
        <Provider store={store}>
            <Router history={createBrowserHistory()}>
                <Switch>
                    <Route path='/' component={EventList} exact/>
                    <Route path='/:cities' component={EventList} exact/>
                    <Route path='/:cities/:categories' component={EventList} exact/>
                    <Route path='/events/:cities/:categories/:id' component={EventDetail} />
                </Switch>
            </Router>
        </Provider>
        )
    }
}

ReactDOM.render(<App/>, document.querySelector("#container"));