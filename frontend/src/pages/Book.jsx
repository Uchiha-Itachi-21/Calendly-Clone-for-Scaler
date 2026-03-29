import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function Book({ theme }) {
  const { slug } = useParams();

  const [event, setEvent] = useState(null);
  const [date, setDate] = useState(new Date());
  const [slots, setSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // LOAD EVENT
  useEffect(() => {
    axios.get(`http://localhost:3000/events/slug/${slug}`)
      .then(res => setEvent(res.data))
      .catch(() => alert("Event not found"));
  }, [slug]);

  // LOAD SLOTS
  useEffect(() => {
    if (event && date) {
      const formatted = date.toISOString().split("T")[0];

      axios
        .get(`http://localhost:3000/bookings/slots/${event.id}/${formatted}`)
        .then(res => setSlots(res.data));
    }
  }, [event, date]);

  const handleBook = async () => {
    const formatted = date.toISOString().split("T")[0];

    if (!selectedTime || !name || !email) {
      alert("Fill all fields");
      return;
    }

    await axios.post("http://localhost:3000/bookings", {
      event_id: event.id,
      name,
      email,
      date: formatted,
      start_time: selectedTime
    });

    alert("Booking Confirmed 🎉");
  };

  if (!event) return <p style={{ padding: "40px" }}>Loading...</p>;

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      marginTop: "50px"
    }}>
      <div style={{
        display: "flex",
        width: "1100px",
        background: theme.card,
        border: `1px solid ${theme.border}`,
        borderRadius: "20px",
        padding: "25px",
        gap: "25px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
      }}>

        {/* LEFT */}
        <div style={{ width: "30%" }}>
          <h2 style={{ marginBottom: "10px" }}>{event.name}</h2>
          <p>{event.duration} mins</p>
        </div>

        {/* MIDDLE - CALENDAR */}
        <div style={{ width: "35%" }}>
          <div style={{
            borderRadius: "16px",
            overflow: "hidden",
            border: `1px solid ${theme.border}`
          }}>
            <Calendar
              onChange={setDate}
              value={date}
            />
          </div>
        </div>

        {/* RIGHT - SLOTS */}
        <div style={{ width: "35%" }}>
          <h3 style={{ marginBottom: "10px" }}>Select Time</h3>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "10px",
            maxHeight: "250px",
            overflowY: "auto"
          }}>
            {slots.length === 0 ? (
              <p>No slots available</p>
            ) : (
              slots.map(slot => (
                <button
                  key={slot}
                  onClick={() => setSelectedTime(slot)}
                  style={{
                    padding: "10px",
                    borderRadius: "20px",
                    border: `1px solid ${theme.border}`,
                    background:
                      selectedTime === slot ? "#006bff" : theme.card,
                    color:
                      selectedTime === slot ? "white" : theme.text,
                    cursor: "pointer",
                    transition: "0.2s"
                  }}
                >
                  {slot}
                </button>
              ))
            )}
          </div>

          {/* FORM */}
          {selectedTime && (
            <div style={{
              marginTop: "20px",
              padding: "15px",
              borderRadius: "12px",
              background: theme.card,
              border: `1px solid ${theme.border}`
            }}>
              <input
                placeholder="Your Name"
                onChange={e => setName(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: `1px solid ${theme.border}`,
                  marginBottom: "10px"
                }}
              />

              <input
                placeholder="Your Email"
                onChange={e => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: `1px solid ${theme.border}`,
                  marginBottom: "10px"
                }}
              />

              <button
                onClick={handleBook}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  background: "#006bff",
                  color: "white",
                  border: "none",
                  fontWeight: "bold",
                  cursor: "pointer"
                }}
              >
                Confirm Booking
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}