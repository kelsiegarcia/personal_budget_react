import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import NoMatch from './components/NoMatch';
import Expenses from './components/Expenses';

export default (
  <Route>
    <Route path="/" component={App} >
      <IndexRoute component={Expenses} />
      <Route path="/expenses" component={Expenses} />
    </Route>
      
    <Route path="*" status={404} component={NoMatch} />
  </Route>
)

