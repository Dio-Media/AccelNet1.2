// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";

// pages
import Home from "./pages/NewHome";
import About from "./pages/About";
import StructureIndex from "./pages/structure/StructureIndex";
import SteeringCommittee from "./pages/structure/SteeringCommittee";
import AdvisoryBoard from "./pages/structure/AdvisoryBoard";
import StudentNetwork from "./pages/structure/StudentNetwork";
import InteractiveMap from "./pages/structure/InteractiveMap";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />

          <Route path="structure">
            <Route index element={<StructureIndex />} />
            <Route path="steering-committee" element={<SteeringCommittee />} />
            <Route path="advisory-board" element={<AdvisoryBoard />} />
            <Route path="student-network" element={<StudentNetwork />} />
            <Route path="interactive-map" element={<InteractiveMap />} />
            <Route path="participants">
              <Route index element={<ParticipantsIndex />} />
              <Route path=":type" element={<ParticipantsByType />} />
            </Route>
          </Route>

          <Route path="working-groups">
            <Route index element={<WorkingGroupsIndex />} />
            <Route path=":wgId" element={<WorkingGroup />} />
          </Route>

          <Route path="activities">
            <Route index element={<ActivitiesIndex />} />
            <Route path="conferences">
              <Route index element={<ConferencesIndex />} />
              <Route path=":slug" element={<ConferenceDetail />} />
            </Route>
            <Route path="workshops">
              <Route index element={<WorkshopsIndex />} />
              <Route path=":slug" element={<WorkshopDetail />} />
            </Route>
          </Route>

          <Route path="publications">
            <Route index element={<PublicationsIndex />} />
            <Route path="datasets" element={<Datasets />} />
            <Route path="journals" element={<Journals />} />
          </Route>

          <Route path="programs">
            <Route path="tools" element={<Tools />} />
            <Route path="multimedia" element={<Multimedia />} />
            <Route path="grants" element={<Grants />} />
            <Route path="stsm" element={<STSM />} />
            <Route path="mentorship" element={<Mentorship />} />
          </Route>

          <Route path="news" element={<NewsIndex />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
