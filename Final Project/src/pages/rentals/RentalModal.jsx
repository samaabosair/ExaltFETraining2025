// src/pages/rentals/RentalModal.jsx
import React, { useState, useEffect } from "react";
import { Modal, Button, Card } from "react-bootstrap";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addRental, updateCar } from "../../services/carService"; 
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

  const queryClient = useQueryClient();

  // التحقق من المستخدم المسجل دخول
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) setUserId(user.uid);
    });
    return () => unsub();
  }, []);

  // حساب السعر الكلي تلقائيًا عند تغيير التواريخ
  useEffect(() => {
    if (startDate && endDate && car.price != null) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
      setTotalPrice(days * Number(car.price));
    } else {
      setTotalPrice(0);
    }
  }, [startDate, endDate, car.price]);

  // إعداد الميوتاشن لإضافة الإيجار وتحديث حالة السيارة
  const mutation = useMutation({
    mutationFn: async () => {
      if (!userId) throw new Error("User not logged in");

      const period = `${new Date(startDate).getTime()} - ${new Date(endDate).getTime()}`;

      // إضافة الإيجار
      await addRental({
        carId: car.id,
        period,
        totalPrice,
        userId
      });

      // تحديث حالة السيارة لتصبح غير متاحة
      await updateCar(car.id, { status: "unavailable" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["rentals"]);
      handleClose();
    },
    onError: (error) => {
      console.error("Error making rental:", error);
      alert("Failed to rent the car. Please try again.");
    }
  });

  const handleConfirm = () => {
    if (!userId) {
      alert("Please login first!");
      return;
    }
    if (car.status === "unavailable") {
      alert("This car is currently unavailable!");
      return;
    }
    mutation.mutate();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton style={modalHeaderStyle}>
        <Modal.Title>Rent {car.name}</Modal.Title>
      </Modal.Header>

      <Modal.Body style={modalBodyStyle}>
        <Card style={{ ...modalBodyStyle, borderRadius: "10px", padding: "10px" }}>
          {car.images && car.images.length > 0 && (
            <Card.Img
              variant="top"
              src={car.images[0]}
              style={{ maxHeight: "200px", objectFit: "cover", width: "100%", borderRadius: "5px" }}
            />
          )}
          <Card.Body>
            <Card.Title>{car.name}</Card.Title>

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
          </Card.Body>
        </Card>
      </Modal.Body>

      <Modal.Footer style={{ ...modalBodyStyle, justifyContent: "flex-end" }}>
        <Button style={addButtonStyle} onClick={handleClose}>Cancel</Button>
        <Button
          style={submitButtonStyle}
          onClick={handleConfirm}
          disabled={mutation.isLoading || car.status === "unavailable"}
        >
          {mutation.isLoading ? "Processing..." : "Confirm"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RentalModal;
