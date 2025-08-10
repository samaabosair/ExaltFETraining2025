import { useState, useEffect } from "react";

export default function EventForm({ initialData = {}, onSubmit, onCancel }) {
  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [date, setDate] = useState(initialData.date ? initialData.date.slice(0, 16) : "");

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setTitle(initialData.title || "");
    setDescription(initialData.description || "");
    setDate(initialData.date ? initialData.date.slice(0, 16) : "");
  }, [initialData]);

  const validate = () => {
    const errs = {};
    if (!title.trim()) errs.title = "Title is required";
    if (!date) errs.date = "Date and time are required";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onSubmit({ title, description, date });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "600px",
        backgroundColor: "#1e1e2f",
        borderRadius: 15,
        margin: "0px auto",
        padding: 30,
        boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#e0e0e0",
        boxSizing: "border-box",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 30, color: "#e766afff" }}>
        {initialData.id ? "Edit Event" : "Create New Event"}
      </h2>

      <div style={{ marginBottom: 25 }}>
        <label
          htmlFor="title"
          style={{ display: "block", marginBottom: 8, fontWeight: "700", fontSize: 16, color: "#a4b0be" }}
        >
          Title*:
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "12px 15px",
            fontSize: 16,
            borderRadius: 8,
            border: errors.title ? "2px solid #ff6b6b" : "1px solid #57606f",
            outline: "none",
            boxSizing: "border-box",
            backgroundColor: "#2f3542",
            color: "#f1f2f6",
            transition: "border-color 0.3s",
          }}
          placeholder="Enter event title"
        />
        {errors.title && (
          <div style={{ color: "#ff6b6b", marginTop: 6, fontWeight: "600" }}>
            {errors.title}
          </div>
        )}
      </div>

      <div style={{ marginBottom: 25 }}>
        <label
          htmlFor="description"
          style={{ display: "block", marginBottom: 8, fontWeight: "700", fontSize: 16, color: "#a4b0be" }}
        >
          Description:
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          placeholder="Write a brief description (optional)"
          style={{
            width: "100%",
            padding: "12px 15px",
            fontSize: 16,
            borderRadius: 8,
            border: "1px solid #57606f",
            outline: "none",
            boxSizing: "border-box",
            resize: "vertical",
            backgroundColor: "#2f3542",
            color: "#f1f2f6",
          }}
        />
      </div>

      <div style={{ marginBottom: 30 }}>
        <label
          htmlFor="date"
          style={{ display: "block", marginBottom: 8, fontWeight: "700", fontSize: 16, color: "#a4b0be" }}
        >
          Date & Time*:
        </label>
        <input
          id="date"
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "12px 15px",
            fontSize: 16,
            borderRadius: 8,
            border: errors.date ? "2px solid #ff6b6b" : "1px solid #57606f",
            outline: "none",
            boxSizing: "border-box",
            backgroundColor: "#2f3542",
            color: "#f1f2f6",
            transition: "border-color 0.3s",
          }}
        />
        {errors.date && (
          <div style={{ color: "#ff6b6b", marginTop: 6, fontWeight: "600" }}>
            {errors.date}
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: 15 }}>
        <button
          type="submit"
          style={{
            flexGrow: 1,
            padding: "14px 0",
            fontSize: 18,
            fontWeight: "700",
            color: "white",
            backgroundColor: "#6e197cff",
            border: "none",
            borderRadius: 10,
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(155, 33, 143, 0.6)",
            transition: "background-color 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#f4aeefff")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#654a5eff")}
        >
          {initialData.id ? "Save" : "Add"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          style={{
            flexGrow: 1,
            padding: "14px 0",
            fontSize: 18,
            fontWeight: "700",
            color: "#2f3542",
            backgroundColor: "#dfe4ea",
            border: "none",
            borderRadius: 10,
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(223, 228, 234, 0.6)",
            transition: "background-color 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#c1c8d7")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#dfe4ea")}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
