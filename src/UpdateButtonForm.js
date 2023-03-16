import React from "react";
import { Modal, Form, Button, Dropdown } from "react-bootstrap";

class UpdateButtonFormModal extends React.Component {
  state = {
    bookToUpdate: {
      title: "",
      description: "",
      status: "",
    },
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { bookToUpdate } = this.state;
    this.props.updateBook(bookToUpdate);
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      bookToUpdate: {
        ...prevState.bookToUpdate,
        [name]: value,
      },
    }));
  };

  handleStatusSelect = (eventKey) => {
    this.setState((prevState) => ({
      bookToUpdate: {
        ...prevState.bookToUpdate,
        status: eventKey,
      },
    }));
  };

  render() {
    const { book } = this.props;
    const { bookToUpdate } = this.state;
    return (
      <>
        <Modal show={this.props.showModal} onHide={this.props.closeModal}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Book Title</Form.Label>
              <Form.Control
                type="text"
                placeholder={book.title}
                name="title"
                value={bookToUpdate.title}
                onChange={this.handleInputChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Book Description</Form.Label>
              <Form.Control
                type="text"
                placeholder={book.description}
                name="description"
                value={bookToUpdate.description}
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="status">
              <Form.Label>Book Status</Form.Label>
              <Dropdown>
                <Dropdown.Toggle variant="secondary">
                  {bookToUpdate.status || book.status}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    eventKey="Read"
                    onSelect={this.handleStatusSelect}
                  >
                    Read
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="Unread"
                    onSelect={this.handleStatusSelect}
                  >
                    Unread
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="Reading"
                    onSelect={this.handleStatusSelect}
                  >
                    Reading
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <Button type="submit" onclick={this.props.updateBook}>Update</Button>
          </Form>
        </Modal>
      </>
    );
  }
}

export default UpdateButtonFormModal;
