import React from 'react';
import {
  Route, Switch, withRouter
} from 'react-router-dom';
import AppBar from './basics/AppBar';
import Home from './Home';
import Dog from './assets/Dog';
import Cat from './assets/Cat';

const WrongPage = (): JSX.Element => (
  <div className="wrong-page">
    <h2>
      Error 404: Wrong page!
    </h2>
  </div>
);

function MainApp() {
  return (
    <div className="main-app">
      <AppBar />
      <div className="main-app-container">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/dog" exact component={Dog} />
          <Route path="/cat" exact component={Cat} />
          <Route path="/404" exact component={WrongPage} />
          <Route component={WrongPage} />
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(MainApp);
