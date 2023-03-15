import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

 class BookFormModal extends React.Component {

render() {
  return (
    <>

      <Modal show={this.props.isModalDisplaying}
            onHide={this.props.hideModal}>
        <Modal.Header closeButton onClick={this.props.handleCloseModal}>
          <Modal.Title>Add Your Own Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Cat in The Hat by Dr. Suess"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={this.props.handleBookSubmit}>
            Add Book
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    );
  }
}

export default BookFormModal;