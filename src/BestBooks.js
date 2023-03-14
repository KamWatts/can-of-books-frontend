import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';

const SERVER = process.env.REACT_APP_SERVER;

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      index: 0 // added index to state
    }
  }

  handleSelect = (selectedIndex) => { // added handleSelect function
    this.setState({
      index: selectedIndex
    });
  }

  async componentDidMount() { // added async
    try {
      let results = await axios.get(`${SERVER}/books`);
      this.setState({
        books: results.data
      })
    } catch(error) {
      console.log('An error occurred: ', error.response.data)
    }
  }

  render() {
    const { books, index } = this.state; // destructured state
    const carouselItems = books.map((book) => (
      <Carousel.Item key={book._id}>
        <img
          className="d-block w-100"
          src={book.image}
          alt={book.title}
        />
        <Carousel.Caption>
          <h3>{book.title}</h3>
          <p>{book.description}</p>
          <p>Status: {book.status}</p>
        </Carousel.Caption>
      </Carousel.Item>
    ));

    return (
      <main>
        <Carousel activeIndex={index} onSelect={this.handleSelect}>
          {books.length > 0 ? (
            carouselItems
          ) : (
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://via.placeholder.com/800x400?text=No+books+found"
                alt="No books found"
              />
            </Carousel.Item>
          )}
        </Carousel>
      </main>
    );
  }
}

export default BestBooks;
