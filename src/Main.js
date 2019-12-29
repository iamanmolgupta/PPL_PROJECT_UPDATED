import { Switch, Route } from 'react-router-dom';
import React from 'react'
import App from './App';
// import Login from './Login';
import Login2 from './Login2';
import Forgot from './Forgot';
import Timeline from './Timeline';
import Singal_post from './Singal_post';
import Index from './Index1';
import Reset from './Reset';
function Main(){
return(
<main>

<Switch>
<Route exact path ='/' component={App} />
<Route path ='/login' component={Login2} />
<Route path ='/forgot' component={Forgot} />
<Route path ='/timeline' component={Timeline} />
<Route path = '/Index' component = {Index} />
<Route path ='/mypost/:number' component={Singal_post} />
<Route path ='/reset' component={Reset} />
</Switch>

</main>
)
}


export default Main


