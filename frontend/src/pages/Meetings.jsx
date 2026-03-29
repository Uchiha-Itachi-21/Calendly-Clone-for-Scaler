import { useEffect, useState } from "react";
import axios from "axios";

export default function Meetings({ theme }) {
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);

  const load = () => {
    axios.get("http://localhost:3000/bookings/upcoming")
      .then(res => setUpcoming(res.data));

    axios.get("http://localhost:3000/bookings/past")
      .then(res => setPast(res.data));
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h2>Upcoming</h2>
      {upcoming.map(m => (
        <div key={m.id}>
          {m.date} {m.start_time}
          <button onClick={() => {
            axios.delete(`http://localhost:3000/bookings/${m.id}`);
            load();
          }}>
            Cancel
          </button>
        </div>
      ))}

      <h2>Past</h2>
      {past.map(m => (
        <div key={m.id}>
          {m.date} {m.start_time}
        </div>
      ))}
    </div>
  );
}