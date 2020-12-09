import './App.css';
import mq from './helper/mqtthelper'
import SiderDemo from './container/register/admin'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from './container/register/login';

function kLink() {
  mq('inTopic', {})
}

function App() {



  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/dashboard">
            <SiderDemo />
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

export default App;
