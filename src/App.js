// Styling
import './App.scss';
import {BrowserRouter as Router, 
        useHistory, 
        Switch, 
        Route} from 'react-router-dom';
// Pages import
import HomePage from './Pages/Homepage/Homepage.js';
import LoginPage from './Pages/LoginPage/LoginPage';

function App() {
  let history = useHistory();
  return (
    <>
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/Login" exact component={LoginPage} />
        </Switch>
     </Router>
    </>
  );
}

export default App;
