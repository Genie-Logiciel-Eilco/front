import React, {lazy, Suspense} from 'react'
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
// import Dashboard from './Pages/Dashboard/Dashboard';
import Users from './Pages/Dashboard/Users/Users'
import Books from './Pages/Dashboard/Books/Books'
import Authors from './Pages/Dashboard/Books/Authors/Authors'
import Publishers from './Pages/Dashboard/Books/Publishers/Publishers'
import Browsepage from "./Pages/Browsepage/Browsepage";
import Bookpage from "./Pages/Bookpage/Bookpage";


function App() {
  let history = useHistory();

  // lazy loaders
  const dashHome = lazy(()=>import("./Pages/Dashboard/Dashboard")) 
  return (
    <>
      <Router history={history}>
        <Suspense fallback={HomePage}>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/Login" exact component={LoginPage} />
          <Route path="/Signup" exact component={SignupPage} />
          <Route path="/books" exact component={Browsepage} />
          <Route path="/books/:id" exact component={Bookpage} />
          <Route exact path="/69420/home" component={dashHome} />
          {/* <Route exact path="/69420/users" component={Users} />
          <Route exact path="/69420/books/book" component={Books} />
          <Route exact path="/69420/books/author" component={Authors} />
          <Route exact path="/69420/books/publisher" component={Publishers} /> */}
          

        </Switch>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
