import React, { Suspense, lazy, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('./routes/Home'));
const Position = lazy(() => import('./routes/Position'));
const NotFound = lazy(() => import('./routes/NotFound'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
            <Route exact path={'/positions/:id'} component={(props) => <Position {...props}/>} />
            <Route exact path={'/'} component={(props) => <Home {...props}/>} />
            <Route exact path={'/not-found'} component={NotFound} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
