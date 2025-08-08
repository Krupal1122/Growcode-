// App.jsx (artifact ID: c72d7da0-a300-4054-b4e3-b842faadd0d4)
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";
import Login from "./pages/Login";
import ProtectedRoute from "./pages/ProtectedRoute";
import Admin from "./components/Admin";

const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="App">
      {!isAdminRoute && <Navbar />}
      {children}
      {!isAdminRoute && <Footer />}
    </div>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });

  return (
    <Router>
      <Layout>
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
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Admin />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<div>Dashboard Content</div>} />
            <Route path="team" element={<div>Team Content</div>} />
            <Route path="projects" element={<div>Projects Content</div>} />
            <Route path="calendar" element={<div>Calendar Content</div>} />
            <Route path="documents" element={<div>Documents Content</div>} />
            <Route path="reports" element={<div>Reports Content</div>} />
            <Route path="heroicons" element={<div>Heroicons Content</div>} />
            <Route path="tailwind-labs" element={<div>Tailwind Labs Content</div>} />
            <Route path="workcation" element={<div>Workcation Content</div>} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;