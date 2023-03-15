import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import BookFormModal from './BookFormModal';

const SERVER = process.env.REACT_APP_SERVER;

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      isModalDisplaying: false,
      bookToDisplay: {},
      index: 0, // added index to state
      status: ''
    }
  }

  handleSelect = (selectedIndex) => { // added handleSelect function
    this.setState({
      index: selectedIndex
    });
  }

  componentDidMount = async () => { // added async
    try {
      let results = await axios.get(`${SERVER}/books`);
      console.log(results);
      this.setState({
        books: results.data,
        status: results.data.status
      })
    } catch(error) {
      console.log('An error occurred: ', error.response.data)
    }
  }


    postBook = async (newBook) => {
      try {
        let url = `${SERVER}/books`;
        let createdBook = await axios.post(url, newBook)
        console.log(createdBook.data);
        this.setState({
          books: [...this.state.books, createdBook.data]
        })
        this.getBooks();
    } catch(error) {
      console.log('There seems to be a problem: ', error.response.data);
    }
  }

  handleBookSubmit = (event) => {
    event.preventDefault();
    let newBook = {
      name: event.target.name.value,
      title: event.target.value,
      description: event.target.description.value,
      userOwnsBook: event.target.userOwnsBook.checked
    }
    this.postBook(newBook) 
  }

  deleteBooks = async (id) => {
    try {
    let url = `${SERVER}/books/${id}`
    // DO NOT EXPECT A RETURN VALUE AFTER axios.delete();
    await axios.delete(url);
    let updatedBooks = this.setState.stae.books.filter(book => book._id !== id);
    this.setState({
      books: updatedBooks
    })
    } catch(error) {
      console.log('There may be an issue: ', error.response.data)
    }
  }

handleCloseModal = () =>
    this.setState({
      isModalDisplaying: false,
    });

  handleOpenModal = (bookObject) => {
    this.setState({
      isModalDisplaying: true,
      bookToDisplay: bookObject
    });

  };

  render() { // destructured state
    
    return (
      <>
        {/* <Carousel activeIndex={index} onSelect={this.handleSelect}>
          {books.length > 0 ? (
            carouselItems
          ) : (
            <Carousel.Item>
              <img
                className="d-block w-100"
                src='http://via.placeholder.com/640x360'
                alt="No books found"
              />
            </Carousel.Item>
          )}
        </Carousel> */}

      {/* const { books, index } = this.state; */}
      <Carousel>

     { this.state.books.map((book) => (
          <Carousel.Item key={book._id}>

            <Image
              className="d-block w-100"
              src='http://via.placeholder.com/640x360'
              alt={book.title}
            />
            <Carousel.Caption>
              <h3>{book.title}</h3>
              <p>{book.description}</p>
              <p>Status: {book.status}</p>
              <Button onClick={() => this.deleteBooks(book._id)}>Delete Book</Button>
            </Carousel.Caption>
          </Carousel.Item>
     )
     )}
        </Carousel>

      <Button onClick = {() => this.setState({
        isModalDisplaying: true
      })}>Add a Book</Button>
    
        {this.state.isModalDisplaying && 

      <BookFormModal
      isModalDisplaying={this.state.isModalDisplaying}
       handleBookSubmit={this.handleBookSubmit} 
       handleCloseModal={this.handleCloseModal}
       handleOpenModal={this.handleOpenModal}/>
        }
      </>
      );
    }
  }
export default BestBooks