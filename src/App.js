import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { getPositions } from './services/positionService';

const Home = lazy(() => import('./routes/Home'));
const NotFound = lazy(() => import('./routes/NotFound'));
const Position = lazy(() => import('./routes/Position'));

const App = () => {

  const [positions, setPositions] = useState([]);

  useEffect(() => {
    (async () => {
      const { data: positions } = await getPositions();
      setPositions(positions);
      console.log(positions);
    })();
  }, [setPositions]);
  
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path={'/positions/:id'} component={(props) => <Position {...props} positions={positions} setPositions={setPositions} />} />
          <Route exact path={'/'} component={(props) => <Home {...props} positions={positions} setPositions={setPositions} />} />
          <Route exact path={'/not-found'} component={NotFound} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
