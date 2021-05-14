import {BrowserRouter,Switch,Route} from 'react-router-dom'

//Routing
import PrivateRoute from './components/Authentication/PrivateRoute/PrivateRoute'

//Components
import Home from './components/routes/Home'
import Register from './components/Authentication/Register'
import Login from './components/Authentication/Login'
import ForgotPassword from './components/Authentication/ForgotPassword'
import ResetPassword from './components/Authentication/ResetPassword'


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <PrivateRoute exact path="/" component={Home}/>
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
