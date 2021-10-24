// Styling
import './App.scss';
import {
  BrowserRouter as Router,
  useHistory,
  Switch,
  Route
} from 'react-router-dom';
// Pages import
import HomePage from './Pages/Homepage/Homepage.js';
import LoginPage from './Pages/LoginPage/LoginPage';
import SignupPage from './Pages/Signup/SignupPage';
import Dashboard from './Pages/Dashboard/Dashboard';
import Users from './Pages/Dashboard/Users/Users'
import Books from './Pages/Dashboard/Books/Books'


function App() {
  let history = useHistory();
  return (
    <>
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/Login" exact component={LoginPage} />
          <Route path="/Signup" exact component={SignupPage} />
          <Route exact path="/69420/home" component={Dashboard} />
          <Route exact path="/69420/users" component={Users} />
          <Route exact path="/69420/books" component={Books} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
