import {BrowserRouter,Switch,Route} from 'react-router-dom'

//Routing
import PrivateRoute from './components/routes/PrivateRoute'

//Components
import Private from './components/elements/Private'
import Register from './components/elements/Register'
import Login from './components/elements/Login'


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <PrivateRoute exact path="/" component={Private}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/register' component={Register}/>
  
      </Switch>
   
    </div>
    </BrowserRouter>
  );
}

export default App;
