import {BrowserRouter,Switch,Route} from 'react-router-dom'

//Routing
import PrivateRoute from './components/routes/PrivateRoute'

//Components
import Private from './components/elements/Private'
import Register from './components/elements/Register'
import Login from './components/elements/Login'
import ForgotPassword from './components/elements/ForgotPassword'
import ResetPassword from './components/elements/ResetPassword'


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <PrivateRoute exact path="/" component={Private}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/register' component={Register}/>
        <Route exact path='/forgotpassword' component={ForgotPassword}/>
        <Route exact path='/resetpassword/:resetToken' component={ResetPassword}/>
      </Switch>
   
    </div>
    </BrowserRouter>
  );
}

export default App;
