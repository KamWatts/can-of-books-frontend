import React from 'react';
import axios from 'axios';
const SERVER = process.env.REACT_APP_SERVER;

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  getBooks = async () => {
    try {
      let results = await axios.get(`${SERVER}/books`);
      this.setState({
        books: results.data,
      })
    } catch (error) {
      console.log('We have an error:', error.response.data)
    }
  }

  componentDidMount() {
    this.getBooks();
  }

  render() {
    let books = this.state.books.map((book, idx) => (
      <p key={book._id}>
        Title: {book.title}, description: {book.description}, status: {book.status}
      </p>
    ))

    return (
      <main>
        {this.state.books.length > 0 ? (
          <>
            {books}
          </>
        ) : (
          <p>No books found.</p>
        )}

      </main>
    )
  }
}

export default BestBooks;
