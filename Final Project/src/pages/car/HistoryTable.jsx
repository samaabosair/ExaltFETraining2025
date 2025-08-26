import React from "react";
import { Card, Table } from "react-bootstrap";

function HistoryTable({ history }) {
  return (
    <Card className="p-3 shadow">
      <h4>Rental History</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Car</th>
            <th>User</th>
            <th>Rent Date</th>
            <th>Return Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {history.length > 0 ? (
            history.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.car}</td>
                <td>{item.user}</td>
                <td>{item.rentDate}</td>
                <td>{item.returnDate}</td>
                <td>{item.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No history found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Card>
  );
}

export default HistoryTable;
