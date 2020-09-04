import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { getPositions } from './services/positionService';
import auth from "./services/authService";
const Home = lazy(() => import('./routes/Home'));
const NotFound = lazy(() => import('./routes/NotFound'));
const Position = lazy(() => import('./routes/Position'));
const Logout = lazy(()=> import('./components/Logout'))

const App = () => {

  const [positions, setPositions] = useState([]);
  const [user, setUser] = useState(auth.getCurrentUser());

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
          <Route exact path={'/positions/:id'} component={(props) => <Position {...props} positions={positions} setPositions={setPositions} user={user} setUser={user} />} />
          <Route exact path={'/'} component={(props) => <Home {...props} positions={positions} user={user} setUser={setUser} setPositions={setPositions} />} />
          <Route exact path={'/not-found'} component={NotFound} />
          <Route path="/logout" component={Logout} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
