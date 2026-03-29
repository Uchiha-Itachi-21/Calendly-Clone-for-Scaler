import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Dashboard({ theme }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/events")
      .then(res => setEvents(res.data));
  }, []);

  return (
    <div>
      <h1>Event Types</h1>

      <div style={{ display: "flex", gap: "20px" }}>
        {events.map(e => (
          <div
            key={e.id}
            style={{
              padding: "20px",
              width: "250px",
              borderRadius: "10px",
              background: theme.card,
              border: `1px solid ${theme.border}`,
              boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
            }}
          >
            <h3>{e.name}</h3>
            <p>{e.duration} mins</p>

            <Link to={`/book/${e.slug}`}>
              <button style={{
                marginTop: "10px",
                padding: "10px",
                background: "#006bff",
                color: "white",
                border: "none",
                borderRadius: "6px"
              }}>
                View Booking Page
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}