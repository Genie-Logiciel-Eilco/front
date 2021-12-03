import React, { lazy, Suspense } from 'react'
// Styling
import './App.scss';
import {
  BrowserRouter as Router,
  useHistory,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
// Pages import
import HomePage from './Pages/Homepage/Homepage.js';
import LoginPage from './Pages/LoginPage/LoginPage';
import SignupPage from './Pages/Signup/SignupPage';
import Users from './Pages/Dashboard/Users/Users'
import Books from './Pages/Dashboard/Books/Books'
import Authors from './Pages/Dashboard/Authors/Authors'
import Publishers from './Pages/Dashboard/Publishers/Publishers'
import Categories from './Pages/Dashboard/Categories/Categories'
import Browsepage from "./Pages/Browsepage/Browsepage";
import Bookpage from "./Pages/Bookpage/Bookpage";
import Logout from './Pages/Logout/Logout';
import BookReadNormal from './Pages/BookReadNormal/BookReadNormal';
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword'

// Routes Imports
import { AdminRoute } from './Routes/AdminRoute'
import { AnonymousRoute } from './Routes/AnonymousRoute'
import { UserRoute } from './Routes/UserRoute'

// Images
import imgUnverified from './Assets/verify.jpg';
import Unverified from './Pages/Unverified/Unverified';
import BookAudio from './Pages/BookAudio/BookAudio';


function App() {
  let history = useHistory();

  // lazy loaders
  const dashHome = lazy(() => import("./Pages/Dashboard/Dashboard"))
  return (

    <>
      <Router history={history}>
        <Suspense fallback={HomePage}>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <AnonymousRoute path="/Login" exact component={LoginPage} />
            <AnonymousRoute path="/Signup" exact component={SignupPage} />
            <AnonymousRoute path="/forgotpassword" component={ForgotPassword} />
            <UserRoute path="/books" exact component={Browsepage} />
            <UserRoute path="/books/:id" exact component={Bookpage} />
            <UserRoute path="/books/read/:id" exact component={BookReadNormal} />
            <UserRoute path="/books/listen/:id" exact component={BookAudio} />
            <AdminRoute exact path="/69420" component={() => {
              return (<Redirect to="/69420/home" />)
            }} />
            <AdminRoute exact path="/69420/home" component={dashHome} />
            <AdminRoute exact path="/69420/users" component={Users} />
            <AdminRoute exact path="/69420/books" component={Books} />
            <AdminRoute exact path="/69420/authors" component={Authors} />
            <AdminRoute exact path="/69420/publishers" component={Publishers} />
            <AdminRoute exact path="/69420/categories" component={Categories} />
            <UserRoute exact path='/logout' component={Logout} />
            <Route exact path="/Unverified" component={() => <Unverified
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
