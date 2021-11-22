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
import ReadPage from './Pages/ReadPage/ReadPage';
// import Dashboard from './Pages/Dashboard/Dashboard';
import Users from './Pages/Dashboard/Users/Users'
import Books from './Pages/Dashboard/Books/Books'
import Authors from './Pages/Dashboard/Books/Authors/Authors'
import Publishers from './Pages/Dashboard/Books/Publishers/Publishers'
import Browsepage from "./Pages/Browsepage/Browsepage";
import Bookpage from "./Pages/Bookpage/Bookpage";
import Logout from './Pages/Logout/Logout';
// Routes Imports
import { AdminRoute } from './Routes/AdminRoute'
import { AnonymousRoute } from './Routes/AnonymousRoute'
import { UserRoute } from './Routes/UserRoute'

// Images
import imgUnverified from './Assets/verify.jpg';
import Unverified from './Pages/Unverified/Unverified';


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
          {/* <Route path="/Login" exact component={LoginPage} />
          <Route path="/Signup" exact component={SignupPage} />
          <Route path="/books" exact component={Browsepage} />
          <Route path="/books/:id" exact component={Bookpage} />

          <Route path="/books/:id/read" exact component={ReadPage} />

          <Route exact path="/69420/home" component={dashHome} />
          <Route exact path="/69420/users" component={Users} />
          <Route exact path="/69420/home" component={dashHome} />
          <Route exact path="/69420/users" component={Users} />
          <Route exact path="/69420/books/book" component={Books} />
          <Route exact path="/69420/books/author" component={Authors} />
          <Route exact path="/69420/books/publisher" component={Publishers} />
           */}
          <AnonymousRoute path="/Login" exact component={LoginPage} />
          <AnonymousRoute path="/Signup" exact component={SignupPage} />
          <UserRoute path="/books" exact component={Browsepage} />
          <UserRoute path="/books/:id" exact component={Bookpage} />
          <AdminRoute exact path="/69420/home" component={dashHome} />
          <AdminRoute exact path="/69420/users" component={Users} />
          <AdminRoute exact path="/69420/home" component={dashHome} />
          <AdminRoute exact path="/69420/users" component={Users} />
          <AdminRoute exact path="/69420/books/book" component={Books} />
          <AdminRoute exact path="/69420/books/author" component={Authors} />
          <AdminRoute exact path="/69420/books/publisher" component={Publishers} />
          <UserRoute exact path='/logout' component={Logout} />
           <Route exact path="/Unverified" component={()=><Unverified 
                                                                header="Email non vérifiée" 
                                                                text="Vous devez vérifier votre email avant de continuer à naviguer notre site"
                                                                img={imgUnverified} />} 
                                                                unverified={true}
                                                                />
        </Switch>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
