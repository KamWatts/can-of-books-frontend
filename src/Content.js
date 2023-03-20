import React from "react";
import axios from "axios";
import { withAuth0 } from '@auth0/auth0-react'

class Content extends React.Component {

  getBooks = async () => {

    if(this.props.auth0.isAuthenticated) {

    const res = await this.props.auth0.isAuthenticated;
    console.log('Hello');

    const jwt = res.__raw;

    console.log(jwt);

    const config = {
      method: 'get',
      baseURL: process.env.REACT_APP_SERVER,
      url: '/books',
      headers: {
      'Authorization': `Bearer ${jwt}`
        }
      }

      const bookResults = await axios(config);

      console.log(bookResults.data)
    }
  }

  componentDidMount() {
    this.getBooks();
  }

  render() {
    console.log(this.props.auth0.user);
    return (
      <>
        <h1>Content page</h1>
      </>
    )
  }
}

export default withAuth0(Content);