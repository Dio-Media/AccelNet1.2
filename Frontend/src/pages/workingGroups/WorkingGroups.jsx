// src/pages/WorkingGroups/WorkingGroup.jsx
import { useParams } from "react-router-dom";
export default function WorkingGroup() {
  const { wgId } = useParams(); // wg1..wg5
  return (
    <section style={{ maxWidth: 1000, margin: "0 auto", padding: 24 }}>
      <h1>Working Group: {wgId?.toUpperCase()}</h1>
      <p>Chairs, scope, outputs…</p>
    </section>
  );
}
