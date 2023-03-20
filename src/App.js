import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import About from './About'
import {withAuth0} from '@auth0/auth0-react'
import LoginButton from './LoginButton'
import LogoutButton from './Logout'
import Content from './Content'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
class App extends React.Component {

  constructor(props) {
    super(props);
      this.state = {
        isModalDisplaying: false,
      }
    }

  render() {
    return (
      <>
        <Router>
          <Header />
          <Routes>
            <Route 
              exact path="/"
              element={<BestBooks />}
            >
            </Route>
            <Route path='/about'
            element={<About/>}
            >
              {this.props.auth0.isAuthenticated ? <LogoutButton/> : <LoginButton/>}
              {this.props.auth0.isAuthenticated ? <Content/> : <h2>Please log in</h2>}
            </Route>
          </Routes>
          <Footer />
        </Router>
      {/* <BestBooks/> */}
      </>
    )
  }
}

export default withAuth0(App);
