import { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCar } from "../../services/carService";
import {
  modalHeaderStyle,
  modalBodyStyle,
  formControlStyle,
  addButtonStyle,
  submitButtonStyle,
} from "./AddCarModal.styles";

function EditCarModal({ show, handleClose, car }) {
  const [brand, setBrand] = useState(car.brand || "");
  const [price, setPrice] = useState(car.price || "");
  const [description, setDescription] = useState(car.description || "");
  const [imageUrls, setImageUrls] = useState(car.images || [""]);
  const [status, setStatus] = useState(car.status || "available");
  const [error, setError] = useState("");

  const queryClient = useQueryClient();

  const updateCarMutation = useMutation({
    mutationFn: (updatedCar) => updateCar(car.id, updatedCar),
    onSuccess: () => {
      queryClient.invalidateQueries(["cars"]);
      handleClose();
    },
    onError: () => setError("Failed to update car."),
  });

  const handleUpdate = (e) => {
    e.preventDefault();
    setError("");

    const nonEmptyUrls = imageUrls.filter((url) => url.trim() !== "");
    if (nonEmptyUrls.length === 0) {
      setError("Please provide at least one image URL.");
      return;
    }

    updateCarMutation.mutate({
      brand,
      price: Number(price),
      description,
      images: nonEmptyUrls,
      status, 
    });
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton style={modalHeaderStyle}>
        <Modal.Title>Edit Car</Modal.Title>
      </Modal.Header>

      <Modal.Body style={modalBodyStyle}>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleUpdate}>
          <Form.Group className="mb-3">
            <Form.Label>Car Name</Form.Label>
            <Form.Control
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              style={formControlStyle}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price per Day ($)</Form.Label>
            <Form.Control
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={formControlStyle}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={formControlStyle}
            >
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </Form.Select>
          </Form.Group>

          <Form.Label>Image URLs</Form.Label>
          {imageUrls.map((url, idx) => (
            <Form.Group className="mb-2 d-flex" key={idx}>
              <Form.Control
                type="text"
                value={url}
                onChange={(e) => {
                  const urls = [...imageUrls];
                  urls[idx] = e.target.value;
                  setImageUrls(urls);
                }}
                placeholder="Enter image URL"
                style={formControlStyle}
                required
              />
              <Button
                variant="danger"
                className="ms-2"
                onClick={() =>
                  setImageUrls(imageUrls.filter((_, i) => i !== idx))
                }
              >
                Remove
              </Button>
            </Form.Group>
          ))}

          <Button
            variant="secondary"
            size="sm"
            className="mb-3"
            style={addButtonStyle}
            onClick={() => setImageUrls([...imageUrls, ""])}
          >
            + Add another image
          </Button>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={formControlStyle}
              required
            />
          </Form.Group>

          <Button
            type="submit"
            className="w-100"
            style={submitButtonStyle}
            disabled={updateCarMutation.isLoading}
          >
            {updateCarMutation.isLoading ? "Updating..." : "Update Car"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditCarModal;
