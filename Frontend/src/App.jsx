// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";

// pages
import Home from "./pages/Home";
import About from "./pages/About";
import StructureIndex from "./pages/Structure/Index";
import SteeringCommittee from "./pages/Structure/SteeringCommittee";
import AdvisoryBoard from "./pages/Structure/AdvisoryBoard";
import StudentNetwork from "./pages/Structure/StudentNetwork";
import InteractiveMap from "./pages/Structure/InteractiveMap";
import ParticipantsIndex from "./pages/Structure/Participants/Index";
import ParticipantsByType from "./pages/Structure/Participants/ParticipantsByType";

import WorkingGroupsIndex from "./pages/WorkingGroups/Index";
import WorkingGroup from "./pages/WorkingGroups/WorkingGroup";

import ActivitiesIndex from "./pages/Activities/Index";
import ConferencesIndex from "./pages/Activities/Conferences/Index";
import ConferenceDetail from "./pages/Activities/Conferences/ConferenceDetail";
import WorkshopsIndex from "./pages/Activities/Workshops/Index";
import WorkshopDetail from "./pages/Activities/Workshops/WorkshopDetail";

import PublicationsIndex from "./pages/Publications/Index";
import Datasets from "./pages/Publications/Datasets";
import Journals from "./pages/Publications/Journals";

import Tools from "./pages/Programs/Tools";
import Multimedia from "./pages/Programs/Multimedia";
import Grants from "./pages/Programs/Grants";
import STSM from "./pages/Programs/STSM";
import Mentorship from "./pages/Programs/Mentorship";

import NewsIndex from "./pages/News/Index";

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
