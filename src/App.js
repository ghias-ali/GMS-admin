import React, { useEffect } from 'react';
import './App.css';
import mq from './helper/mqtthelper'
import SiderDemo from './container/register/admin'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './redux/store';
import Login from './container/register/login';
import Register from './container/register/register';
import { client } from './config';
import { setLoginState, setIsLoaded } from './redux/actions';


function kLink() {
  mq('inTopic', {})
}

function App(props) {
  const dispatch = useDispatch();
  const isLoaded = useSelector(state => state.authReducer.isLoaded);
  const isAuthenticated = useSelector(state => state.authReducer.isLoggedIn);

  useEffect(() => {
    client.reAuthenticate().then(res => {
      dispatch(setLoginState(true));
      dispatch(setIsLoaded(true));
      console.log({ res });
      props.history.push('/dashboard');
    }).catch((e) => {
      dispatch(setIsLoaded(true));
    });
  }, []);

  return (
    <Router basename="/admin">
      <div className="App">

        {isLoaded ?
          <Switch>
            <Route exact path="/dashboard" component={SiderDemo} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Redirect from="*" to="/login" />
          </Switch> : <div>Loading...</div>
        }


      </div>
    </Router>
  );
}

const FinallApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
export default FinallApp;
