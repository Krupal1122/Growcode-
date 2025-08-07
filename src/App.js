import React from "react";
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
import Blogs from "./pages/Blogs"; // Use Blogs instead of BlogPage
import BlogDetail from "./pages/BlogDetail"; // BlogDetail will be created

const App = () => {
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
          <Route path="/blogs" element={<Blogs />} /> {/* Use Blogs for /blogs route */}
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/contact" element={<Growcodecontact />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;