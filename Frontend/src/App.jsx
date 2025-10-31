import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import Layout
import Layout from "./components/Layout";

// Import Standalone Pages (Goal 1)
import Login from "./components/login";
import Signup from "./components/signup";

// Import Pages to be nested in Layout
import NewHome from "./pages/NewHome";
import { About } from "./pages/About";
// ... import other pages ...

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* STANDALONE ROUTES (No Navbar/Footer) */}
        {/* Goal 1: Your login page is a standalone route */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* LAYOUT ROUTES (With Navbar/Footer) */}
        {/* Goals 3 & 4: These routes are wrapped by Layout */}
        <Route path="/" element={<Layout />}>
          {/* Goal 2: NewHome is the index route, and it contains your NewsSlider */}
          <Route index element={<NewHome />} />
          <Route path="about" element={<About />} />
          {/* Add all other pages that need the Navbar/Footer here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;