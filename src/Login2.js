import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './Login'
import Login1 from './Login1'

// The Roster component matches one of two different routes
// depending on the full pathname
const Login2 = () => (
  <Switch>
    <Route exact path='/login' component={Login}/>
    <Route path='/login/:number' component={Login1}/>
  </Switch>
)


export default Login2
