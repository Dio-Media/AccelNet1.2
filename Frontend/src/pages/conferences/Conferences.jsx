// src/pages/Activities/Conferences/ConferenceDetail.jsx
import { useParams } from "react-router-dom";
export default function ConferenceDetail() {
  const { slug } = useParams();
  return (
    <section style={{ maxWidth: 1000, margin: "0 auto", padding: 24 }}>
      <h1>Conference: {slug?.replaceAll("-", " ")}</h1>
      <p>Dates, venue, program, registration…</p>
    </section>
  );
}
