import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { getPositions } from './services/positionService';
import auth from "./services/authService";

const Home = lazy(() => import('./routes/Home'));
const NotFound = lazy(() => import('./routes/NotFound'));
const Position = lazy(() => import('./routes/Position'));
const Logout = lazy(() => import('./components/Logout'));
const Register = lazy(() => import('./routes/Register'));
const SignIn = lazy(() => import('./routes/SignIn'));
const Dashboard = lazy(() => import('./routes/dashboard'));

const App = () => {

  const [positions, setPositions] = useState([]);
  const [user, setUser] = useState(auth.getCurrentUser());

  useEffect(() => {
    (async () => {
      const { data: positions } = await getPositions();
      setPositions(positions);
    })();
  }, [setPositions]);

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path={'/'} component={(props) => <Home {...props} positions={positions} user={user} setUser={setUser} setPositions={setPositions} />} />
          <Route exact path={'/positions/:id'} component={(props) => <Position {...props} positions={positions} setPositions={setPositions} user={user} setUser={user} />} />
          <Route exact path={'/dashboard/:id'} component={(props) => <Dashboard {...props} positions={positions} setPositions={setPositions} user={user} setUser={user} />} />
          <Route exact path={'/register'} component={(props) => <Register {...props} />} />
          <Route exact path={'/login'} component={(props) => <SignIn {...props} user={user} setUser={setUser} />} />
          <Route exact path="/logout" component={Logout} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
