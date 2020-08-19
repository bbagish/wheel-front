import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('./routes/Home'));
const Options = lazy(() => import('./routes/Options'));

const App = () => {

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/positions/:id" component={Options} />
          <Route path="/" component={Home} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
