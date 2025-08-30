import React, { useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { getUserRentals, getAllRentals, getCars } from "../../services/carService";
import { auth } from "../../services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  cardStyle,
  tableStyle,
  thStyle,
  tdStyle
} from "./HistoryTable.styles";

function HistoryTable() {
  const [userId, setUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        setIsAdmin(user.email === "admin@admin.com"); 
      } else {
        setUserId(null);
        setIsAdmin(false);
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    getCars().then(setCars).catch(console.error);
  }, []);

  const { data: history = [], isLoading, isError, error } = useQuery({
    queryKey: ["rentals", userId],
    queryFn: () => {
      if (isAdmin) return getAllRentals(); 
      return getUserRentals(userId);
    },
    enabled: !!userId,
  });

  const getCarName = (carId) => {
    const car = cars.find(c => c.id === carId);
    return car ? car.brand : carId;
  };

  if (!userId) return <p>Please login to see your history.</p>;

  if (isAdmin) return null;

  if (isLoading) return <p>Loading rental history...</p>;
  if (isError) return <p style={{ color: "red" }}>Error: {error.message}</p>;

  return (
    <Card style={cardStyle}>
      <h4>Rental History</h4>
      <Table hover style={tableStyle} variant="dark">
        <thead>
          <tr>
            <th style={thStyle}>#</th>
            <th style={thStyle}>Car</th>
            <th style={thStyle}>Rental Period</th>
            <th style={thStyle}>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {history.length > 0 ? history.map((item, index) => {
            const [start, end] = item.period.split(" - ").map(ts => new Date(Number(ts)).toLocaleDateString());
            return (
              <tr key={item.id}>
                <td style={tdStyle}>{index + 1}</td>
                <td style={tdStyle}>{getCarName(item.carId)}</td>
                <td style={tdStyle}>{start} - {end}</td>
                <td style={tdStyle}>${item.totalPrice}</td>
              </tr>
            );
          }) : (
            <tr>
              <td colSpan={4} style={{ textAlign: "center", padding: "20px", color: "#ccc" }}>
                No rental history found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Card>
  );
}

export default HistoryTable;
