import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import { Route } from 'react-router-dom';
function App1()
{
return (
<div>
<Route path="" component={Header} />
  <Main />
  <Route path="" component={Footer} />

</div>

);

}

export default App1;