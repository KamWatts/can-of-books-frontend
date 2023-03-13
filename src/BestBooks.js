import React from 'react';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  componentDidMount() {
    // DONE: Make a GET request to your API to fetch all the books from the database
    fetch('/api/books')
      .then(response => response.json())
      .then(data => this.setState({ books: data }))
      .catch(error => console.log(error));
  }

  render() {
    const { books } = this.state;

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {books.length ? (
          <Slider autoplay={2000}>
            {books.map((book, index) => (
              <div key={index} style={{ background: `url(${book.image}) no-repeat center center` }}>
                <h3>{book.title}</h3>
                <p>{book.description}</p>
              </div>
            ))}
          </Slider>
        ) : (
          <h3>No Books Found :(</h3>
        )}
      </>
    )
  }
}

export default BestBooks;
