import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Hero from "./pages/Hero";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Team from "./pages/Team";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import Footer from "./pages/Footer";
import About from "./pages/About";
import Growcodecontact from "./pages/Growcodecontact";
import GrowcodeServices from "./pages/GrowcodeServices";
import Jobdata from "./pages/Jobdata";
import Blogs from "./pages/Blogs"; // Your BlogPage component
import BlogDetail from "./pages/BlogDetail";
import Login from "./pages/Login"; // New Login component
import ProtectedRoute from "./pages/ProtectedRoute"; // New ProtectedRoute component

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true"; // Persist login state
  });

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<GrowcodeServices />} />
          <Route path="/career" element={<Jobdata />} />
          <Route path="/portfolio" element={<Projects />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route
            path="/blogs-admin"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Blogs />
              </ProtectedRoute>
            }
          />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/contact" element={<Growcodecontact />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;