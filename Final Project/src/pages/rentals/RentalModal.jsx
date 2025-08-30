import React, { useState, useEffect } from "react";
import { Modal, Button, Card, ListGroup } from "react-bootstrap";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addRental } from "../../services/carService"; 
import { auth } from "../../services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  modalHeaderStyle,
  modalBodyStyle,
  formControlStyle,
  addButtonStyle,
  submitButtonStyle
} from "../admin/AddCarModal.styles";

const RentalModal = ({ show, handleClose, car }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [userId, setUserId] = useState(null);
  const [overlappingBooking, setOverlappingBooking] = useState(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) setUserId(user.uid);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (startDate && endDate && car.price != null) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
      setTotalPrice(days * Number(car.price));

      const overlap = car.rentals?.find(r => {
        const [rStart, rEnd] = r.period.split(" - ").map(Number);
        return (start.getTime() <= rEnd) && (end.getTime() >= rStart);
      });
      setOverlappingBooking(overlap || null);
    } else {
      setTotalPrice(0);
      setOverlappingBooking(null);
    }
  }, [startDate, endDate, car.price, car.rentals]);

  const mutation = useMutation({
    mutationFn: async () => {
      if (!userId) throw new Error("User not logged in");
      if (overlappingBooking) throw new Error("This car is unavailable for selected dates");

      const period = `${new Date(startDate).getTime()} - ${new Date(endDate).getTime()}`;

      await addRental({
        carId: car.id,
        period,
        totalPrice,
        userId
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["rentals"]);
      queryClient.invalidateQueries(["cars"]);
      handleClose(); 
      window.location.href = "/main"; 
    },
    onError: (error) => {
      alert(error.message || "Failed to rent the car. Please try again.");
    }
  });

  const handleConfirm = () => {
    if (!userId) {
      alert("Please login first!");
      return;
    }
    mutation.mutate();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton style={modalHeaderStyle}>
        <Modal.Title>Rent {car.brand}</Modal.Title>
      </Modal.Header>

      <Modal.Body style={modalBodyStyle}>
        <Card style={{ ...modalBodyStyle, borderRadius: "10px", padding: "10px" }}>
          {car.images?.[0] && (
            <Card.Img
              variant="top"
              src={car.images[0]}
              style={{ maxHeight: "200px", objectFit: "cover", width: "100%", borderRadius: "5px" }}
            />
          )}
          <Card.Body>
            <Card.Title>{car.brand}</Card.Title>

            <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
              <div style={{ flex: 1 }}>
                <label>Start Date:</label>
                <input
                  type="date"
                  style={formControlStyle}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label>End Date:</label>
                <input
                  type="date"
                  style={formControlStyle}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>

            <p style={{ fontWeight: "bold", fontSize: "16px", marginTop: "10px" }}>
              Total Price: ${totalPrice}
            </p>

            {car.rentals?.length > 0 && (
              <div style={{ marginTop: "10px" }}>
                <p style={{ fontWeight: "bold" }}>Existing Bookings:</p>
                <ListGroup>
                  {car.rentals.map((r, idx) => {
                    const start = new Date(Number(r.period.split(" - ")[0])).toLocaleDateString();
                    const end = new Date(Number(r.period.split(" - ")[1])).toLocaleDateString();
                    return <ListGroup.Item key={idx}>{start} - {end}</ListGroup.Item>;
                  })}
                </ListGroup>
              </div>
            )}

            {overlappingBooking && (
              <p style={{ color: "red", fontWeight: "bold", marginTop: "10px" }}>
                This car is already booked for selected dates!
              </p>
            )}
          </Card.Body>
        </Card>
      </Modal.Body>

      <Modal.Footer style={{ ...modalBodyStyle, justifyContent: "flex-end" }}>
        <Button style={addButtonStyle} onClick={handleClose}>Cancel</Button>
        <Button
          style={submitButtonStyle}
          onClick={handleConfirm}
          disabled={mutation.isLoading || !!overlappingBooking}
        >
          {mutation.isLoading ? "Processing..." : "Confirm"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RentalModal;
