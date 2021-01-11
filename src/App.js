import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginPage from './pages/login';
import RegisterUser from './pages/register';
import Navbar from './components/nav_bar';
import LandingPage from './pages/landing';

function App() {
  const UserRoutes = () => {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route
            path="/"
            exact
            component={LandingPage}
          // render={()=>{
          //   return (
          //     <Redirect to="/users/login"></Redirect>
          //   )
          // }}
          >
          </Route>
        </Switch>

      </div>
    );
  };
  return (

    <Router>
      <Switch>
        <Route path="/users/login" component={LoginPage}>
        </Route>
        <Route path="/users/register" component={RegisterUser}>
        </Route>
        <Route component={UserRoutes}></Route>

      </Switch>
    </Router>


  );
}

export default App;
