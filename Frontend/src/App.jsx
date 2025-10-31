import { lazy, Suspense } from "react";
import {
  BrowserRouter,
  HashRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";

// ---- Use HashRouter on GitHub Pages, BrowserRouter locally
const Router =
  typeof window !== "undefined" &&
  window.location.hostname.includes("github.io")
    ? HashRouter
    : BrowserRouter;

// ---- Fall back to a stub page if a lazy import fails
function Stub({ title = "Coming soon" }) {
  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontWeight: 800, fontSize: 24 }}>{title}</h1>
      <p style={{ color: "#666" }}>
        This route is wired up, but the page file wasn’t found or failed to
        load. Check the file path / export.
      </p>
    </div>
  );
}
const lazyPage = (loader, fallbackTitle) =>
  lazy(() =>
    loader().catch((err) => {
      console.error("Route load failed:", err);
      return { default: () => <Stub title={fallbackTitle} /> };
    })
  );

// ---- Helper for your repo's NAMED exports
// Your files use `export function ...`, not `export default function ...`
// This helper imports the named export and makes it the default for lazy loading.
const lazyNamed = (loader, exportName, fallbackTitle) =>
  lazyPage(
    () => loader().then((module) => ({ default: module[exportName] })),
    fallbackTitle
  );

// ---- Auth Pages (Standalone)
const Login = lazyPage(() => import("./components/login"), "Login");
const Signup = lazyPage(() => import("./components/signup"), "Signup");

// ---- Top-level pages
const Home = lazyPage(() => import("./pages/NewHome"), "Home");
const About = lazyNamed(() => import("./pages/About"), "About", "About");
const EditProfile = lazyPage(
  () => import("./pages/editProfile"),
  "Edit Profile"
);

// ---- Structure
const StructureIndex = lazyNamed(
  () => import("./pages/structure/Index"),
  "StructureIndex",
  "Structure"
);
const SteeringCommittee = lazyNamed(
  () => import("./pages/structure/SteeringCommitee"), // Note: "Commitee" spelling in filename
  "SteeringCommittee",
  "Steering Committee"
);
const AdvisoryBoard = lazyNamed(
  () => import("./pages/structure/AdvisoryBoard"),
  "AdvisoryBoard",
  "Advisory Board"
);
const StudentNetwork = lazyNamed(
  () => import("./pages/structure/StudentNetwork"),
  "StudentNetwork",
  "Student Network"
);
const InteractiveMap = lazyNamed(
  () => import("./pages/structure/InteractiveMap"),
  "InteractiveMap",
  "Interactive Map"
);
const ParticipantsIndex = lazyNamed(
  () => import("./pages/structure/participants/Index"),
  "ParticipantsIndex",
  "Participants"
);
const ParticipantsByType = lazyNamed(
  () => import("./pages/structure/participants/ParticipantsByType"),
  "ParticipantsByType",
  "Participants by Type"
);

// ---- Working Groups
const WorkingGroupsIndex = lazyNamed(
  () => import("./pages/workingGroups/Index"),
  "WorkingGroupsIndex",
  "Working Groups"
);
const WorkingGroup = lazyNamed(
  () => import("./pages/workingGroups/WorkingGroups"), // Note: "WorkingGroups.jsx" (plural)
  "WorkingGroups",
  "Working Group"
);

// ---- Events & Activities (Path changed to "events" to match navbar)
const ActivitiesIndex = lazyNamed(
  () => import("./pages/activities/ActivitiesIndex"),
  "ActivitiesIndex",
  "Activities"
);
const ConferencesIndex = lazyNamed(
  () => import("./pages/activities/conference/Index"),
  "ConferencesIndex",
  "Conferences"
);
const ConferenceDetails = lazyNamed(
  () => import("./pages/activities/conference/ConferenceDetails"),
  "ConferenceDetail", // Note: "ConferenceDetail" in file
  "Conference Details"
);
const WorkshopsIndex = lazyNamed(
  () => import("./pages/activities/workshops/Index"),
  "WorkshopsIndex",
  "Workshops"
);
const WorkshopDetails = lazyNamed(
  () => import("./pages/activities/workshops/WorkshopDetails"),
  "WorkshopDetail", // Note: "WorkshopDetail" in file
  "Workshop Details"
);

// ---- Resources (Consolidated to match navbar)
const PublicationsIndex = lazyNamed(
  () => import("./pages/publications/Index"),
  "PublicationsIndex",
  "Publications"
);
const Datasets = lazyNamed(
  () => import("./pages/publications/Dataset"), // Note: "Dataset.jsx" (singular)
  "Datasets",
  "Datasets"
);
const Journals = lazyNamed(
  () => import("./pages/publications/Journals"),
  "Journals",
  "Journals"
);
const Tools = lazyNamed(
  () => import("./pages/programs/Tools"),
  "Tools",
  "Tools"
);
const Multimedia = lazyNamed(
  () => import("./pages/programs/Multimedia"),
  "Multimedia",
  "Multimedia"
);
const Grants = lazyNamed(
  () => import("./pages/programs/Grants"),
  "Grants",
  "Grants"
);
const STSM = lazyNamed(() => import("./pages/programs/STSM"), "STSM", "STSM");
const Mentorship = lazyNamed(
  () => import("./pages/programs/Mentorship"),
  "Mentorship",
  "Mentorship"
);

// ---- Not found
function NotFound() {
  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontWeight: 800, fontSize: 24 }}>404 — Page not found</h1>
      <p style={{ color: "#666" }}>Check the URL or use the navbar above.</p>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Suspense fallback={<div style={{ padding: 24 }}>Loading…</div>}>
        <Routes>
          {/* Standalone routes (no navbar/footer) */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Main layout routes (with navbar/footer) */}
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="profile" element={<EditProfile />} />

            {/* Structure */}
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

            {/* Working Groups */}
            <Route path="working-groups">
              <Route index element={<WorkingGroupsIndex />} />
              <Route path=":wgId" element={<WorkingGroup />} />
            </Route>

            {/* Events (Matches navbar "Events & Activities") */}
            <Route path="events">
              <Route index element={<ActivitiesIndex />} />
              <Route path="conferences">
                <Route index element={<ConferencesIndex />} />
                <Route path=":id" element={<ConferenceDetails />} />
              </Route>
              <Route path="workshops">
                <Route index element={<WorkshopsIndex />} />
                <Route path=":slug" element={<WorkshopDetails />} />
              </Route>
              <Route path="news" element={<NewsIndex />} />
            </Route>

            {/* Resources (Consolidated to match navbar "Resources") */}
            <Route path="resources">
              <Route path="publications">
                <Route index element={<PublicationsIndex />} />
                <Route path="datasets" element={<Datasets />} />
                <Route path="journals" element={<Journals />} />
              </Route>
              <Route path="tools" element={<Tools />} />
              <Route path="multimedia" element={<Multimedia />} />
              <Route path="grants" element={<Grants />} />
              <Route path="stsm" element={<STSM />} />
              <Route path="mentorship" element={<Mentorship />} />
            </Route>

            {/* Fallbacks */}
            <Route path="404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}