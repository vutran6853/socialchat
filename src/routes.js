import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import Auth from './components/auth/Auth';
import Form from './components/form/Form';
import Post from './components/post/Post';

export default(
  <Switch>
    <Route exact path='/' component={ Auth } ></Route>
    <Route path='/dashboard' component={ Dashboard } ></Route>
    <Route path='/post/:postId' component={ Post } ></Route>
    <Route path='/new' component={ Form } ></Route>
  </Switch>
)