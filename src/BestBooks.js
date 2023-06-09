import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import BookFormModal from './BookFormModal';
import UpdateButtonFormModal from './UpdateButtonForm';

const SERVER = process.env.REACT_APP_SERVER;

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      isModalDisplaying: false,
      isUpdateModalDisplaying: false,
      bookToDisplay: {},
      index: 0, 
      status: '',
      showUpdateForm: false
    }
  }
  
  handleSelect = (selectedIndex) => { 
    this.setState({
      index: selectedIndex
    });
  }

  getBooks = async () => { 
    if (this.props.auth0.isAuthenticated) {
      const res = await this.props.auth0.getIdTokenClaims();
      console.log('hello, this is the res');
      console.log(res);

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
      console.log(bookResults.data);
    }
      try {
      let results = await axios.get(`${SERVER}/books`);
      console.log(results.data);
      this.setState({
        books: results.data,
        // status: results.data.status
      })
    } catch(error) {
      console.log('An error occurred: ', error.response.data)
    }
  }

  componentDidMount() {
    this.getBooks();
  }

    postBooks = async (newBook) => {
      try {
        console.log(newBook);
        let url = `${SERVER}/books`;
        let createdBook = await axios.post(url, newBook)
        console.log(createdBook.data);
        this.setState({
          books: [...this.state.books, createdBook.data]
        })
    } catch(error) {
      console.log('There seems to be a problem: ', error.response);
    }
  }

  handleBookSubmit = (event) => {
    event.preventDefault();
    let newBook = {
      name: event.target.name.value,
      title: event.target.title.value,
      description: event.target.description.value,
      userOwnsBook: event.target.userOwnsBook.checked
    }
    console.log(newBook);
    this.postBooks(newBook) 
  }

  deleteBooks = async (id) => {
    try {
    let url = `${SERVER}/books/${id}`
    // DO NOT EXPECT A RETURN VALUE AFTER axios.delete();
    await axios.delete(url);
    let updatedBooks = this.state.books.filter(book => book._id !== id);
    this.setState({
      books: updatedBooks
    })
    } catch(error) {
      console.log('There may be an issue: ', + error.response + ', ' +  error.response.data)
    }
  }

  updateBook = async (bookToUpdate) => {
    console.log(bookToUpdate);
    try {
      let url = `${SERVER}/books/${bookToUpdate.data._id}`
      let updatedBookFromDB = await axios.put(url, bookToUpdate);
      let updatedBooks = this.state.books.map((book) => {

        return book._id === bookToUpdate._id 
          ? updatedBookFromDB.data
          : book
      });
      console.log(updatedBooks);
      this.setState({
        books: updatedBooks
      })
    } catch (error) {
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

  closeUpdateModal = () =>
    this.setState({
      isUpdateModalDisplaying: false,
    });

  openUpdateModal = (bookObject) => {
    this.setState({
      isUpdateModalDisplaying: true,
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
              <Button onClick={() => this.openUpdateModal(book)}>Update Book</Button>
            </Carousel.Caption>
          </Carousel.Item>
     )
     )}
        </Carousel>

      <Button onClick = {() => this.postBooks({})}>Add a Book</Button>
    
        {this.state.isModalDisplaying && 

      <BookFormModal
      isModalDisplaying={this.state.isModalDisplaying}
       handleBookSubmit={this.handleBookSubmit} 
       handleCloseModal={this.handleCloseModal}
       handleOpenModal={this.handleOpenModal}/>
      }

      <UpdateButtonFormModal
      showModal={this.state.isUpdateModalDisplaying}
      closeModal={this.closeUpdateModal}
      book={this.state.bookToDisplay}
      updateBook={this.updateBook}
      />
      </>
      );
    }
  }
export default BestBooks