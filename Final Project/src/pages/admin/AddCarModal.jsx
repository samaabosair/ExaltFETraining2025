import { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../services/firebase";

function AddCarModal({ show, handleClose, onCarAdded }) {
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrls, setImageUrls] = useState([""]); // array of URLs
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleAddCar = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    // تحقق من أن هناك رابط واحد على الأقل
    const nonEmptyUrls = imageUrls.filter(url => url.trim() !== "");
    if (nonEmptyUrls.length === 0) {
      setError("Please provide at least one image URL.");
      return;
    }

    try {
      await addDoc(collection(db, "cars"), {
        brand,
        price: Number(price),
        description,
        images: nonEmptyUrls // array of image URLs
      });

      setSuccess("Car added successfully!");
      setBrand(""); setPrice(""); setDescription(""); setImageUrls([""]);

      if (onCarAdded) onCarAdded();
      handleClose();
    } catch (err) {
      console.error(err);
      setError("Failed to add car.");
    }
  };

  const handleImageChange = (index, value) => {
    const urls = [...imageUrls];
    urls[index] = value;
    setImageUrls(urls);
  };

  const addImageField = () => setImageUrls([...imageUrls, ""]);

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add New Car</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {success && <Alert variant="success">{success}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleAddCar}>
          <Form.Group className="mb-3">
            <Form.Label>Car Name</Form.Label>
            <Form.Control type="text" value={brand} onChange={(e) => setBrand(e.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price per Day ($)</Form.Label>
            <Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </Form.Group>

          <Form.Label>Image URLs</Form.Label>
          {imageUrls.map((url, idx) => (
            <Form.Group className="mb-2" key={idx}>
              <Form.Control
                type="text"
                value={url}
                onChange={(e) => handleImageChange(idx, e.target.value)}
                placeholder="Enter image URL"
                required
              />
            </Form.Group>
          ))}
          <Button variant="secondary" size="sm" onClick={addImageField} className="mb-3">
            + Add another image
          </Button>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} required />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">Add Car</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddCarModal;
