import './App.css';
import mq from './helper/mqtthelper'
import SiderDemo from './container/register/admin'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Provider, useSelector } from 'react-redux';
import { store } from './redux/store';
import Login from './container/register/login';
import Register from './container/register/register';


function kLink() {
  mq('inTopic', {})
}

function App() {
  const isAuthenticated = useSelector(state => state.authReducer.isLoggedIn);



  return (
    <Router>
      <div className="App">
        <Switch>
            
        <Route path="/dashboard" component={SiderDemo} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/" component={Login} />


        </Switch>

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
