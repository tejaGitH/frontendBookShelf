import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Button, Form } from "react-bootstrap";
import { addReview } from "../actions/reviewActions"; // Adjust path to your actions file

const ReviewModal = ({ show, onClose, bookId }) => {
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addReview({ bookId, reviewData: { rating, review } }))
      .unwrap()
      .then(() => {
        onClose(); // Close modal on success
      })
      .catch((err) => {
        console.error("Error adding review:", err);
      });
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add a Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="rating">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="review">
            <Form.Label>Review</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ReviewModal;