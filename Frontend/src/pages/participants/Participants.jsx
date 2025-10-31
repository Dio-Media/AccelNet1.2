// src/pages/Structure/Participants/ParticipantsByType.jsx
import { useParams } from "react-router-dom";
export default function ParticipantsByType() {
  const { type } = useParams(); // science | engineering | art | humanities | industry | government | media
  const title = type?.[0]?.toUpperCase() + type?.slice(1);
  return (
    <section style={{ maxWidth: 1200, margin: "0 auto", padding: 24 }}>
      <h1>Participants — {title}</h1>
      <p>Grid of profiles here.</p>
    </section>
  );
}
