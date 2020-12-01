import './App.css';
import mq from './helper/mqtthelper'
import SiderDemo from './container/register/admin'

function kLink() {
  mq('inTopic', {})
}

function App() {



  return (
    <div className="App">

      <SiderDemo />

    </div>
  );
}

export default App;
