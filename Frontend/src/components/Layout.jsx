// src/components/Layout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";

export default function Layout() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "70vh" }}>
        {/* Outlet renders the current route's component (e.g., NewHome) */}
        <Outlet />
      </main>
      <Footer />
    </>
  );
}