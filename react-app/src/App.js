import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
// import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import BoardDetails from './components/Board/BoardDetails';
import { getAllBoards } from './store/board';
import Home from './components/Home';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
      if(user) dispatch(getAllBoards())
    })();
  }, [dispatch]);

  const user = useSelector(state => state.session.user)

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        {/* <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute> */}
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/:username/boards' exact={true} >
          <Home {...user} />
        </ProtectedRoute>
        <ProtectedRoute path='/boards/:id/:boardName' exact={true} >
          <BoardDetails />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <h1>Splash Page</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
