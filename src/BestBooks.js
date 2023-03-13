import React from 'react';
import axios from 'axios';


class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      title: '',
      decription: '',
      image: ''
    }
  }


  getBooks = async () => {
    try {
      let results = await axios.get(`${process.env.SERVER}/books`);
      this.setState({
        books: results.data
      })
    } catch(error) {
      console.log('An error occurred: ', error.response.data)
    }
    console.log(this.state.books);
  }

  componentDidMount() {
    // DONE: Make a GET request to your API to fetch all the books from the database
    // axios.get('/models/book.js')
    //   .then(response => response.json())
    //   .then(data => this.setState({ books: data }))
    //   .catch(error => console.log(error));
  }

  render() {
    this.getBooks();
    const { books } = this.state;
    console.log(books);
    // render the books using the react-animated-slider library

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.books.length > 0} ? (
          <div>
            {books.map((book, index) => (
                    <div key={index} style={{ background: `url(${this.book.image}) no-repeat center center` }}>
                <h3>{this.book.title}</h3>
                <p>{this.book.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <h3>The collection is empty(</h3>
        )
      </>
    )
  }
}

export default BestBooks;
