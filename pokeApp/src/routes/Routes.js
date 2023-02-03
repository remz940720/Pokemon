import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from '../components/Login/Login';
import Main from '../components/Login/Main'

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/menu" component={Main}/>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
