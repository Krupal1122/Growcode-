// src/App.js
import React, { useState, Suspense, lazy } from "react";
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
import APIInputTable from "./components/Blogs/APIInputTable";
import FormCard from "./components/Blogs/FormCard";
import FormDetail from "./components/Blogs/FormDetail";
import EditForm from "./components/Blogs/EditForm";
import { SidebarProvider } from "./SidebarContext";
import ProjectDetailsForm from "./components/projects/ProjectDetailsForm";
import ProjectDetailsPage from "./components/projects/ProjectDetailsPage";
import PortfolioPage from "./pages/Projects"; // Import PortfolioPage
import ProjectDetails from "./components/projects/ProjectDetails"; // Import ProjectDetails

const Admin = lazy(() => import("./components/Blogs/Admin"));

const BlogPage = () => <Hero />;

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
      <SidebarProvider>
        <Layout>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<BlogPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<GrowcodeServices />} />
              <Route path="/career" element={<Jobdata />} />
              <Route path="/portfolio" element={<PortfolioPage />} /> {/* Updated to PortfolioPage */}
              <Route path="/project/:id" element={<ProjectDetails />} /> {/* Added ProjectDetails route */}
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/contact" element={<Growcodecontact />} />
              <Route
                path="/login"
                element={<Login setIsAuthenticated={setIsAuthenticated} />}
              />
              <Route
                path="/blogs-admin"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Blogs />
                  </ProtectedRoute>
                }
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
                <Route path="projects" element={<ProjectDetailsPage />} />
                <Route path="projects/add" element={<ProjectDetailsForm />} />
                <Route path="projects/edit/:id" element={<ProjectDetailsForm />} />
                <Route path="calendar" element={<div>Calendar Content</div>} />
                <Route path="Blogs" element={<FormCard />} />
                <Route path="Blogs/add" element={<APIInputTable />} />
                <Route path="Blogs/edit/:id" element={<APIInputTable />} />
                <Route path="Blogs/form/:id" element={<FormDetail />} />
                <Route path="reports" element={<div>Reports Content</div>} />
              </Route>
            </Routes>
          </Suspense>
        </Layout>
      </SidebarProvider>
    </Router>
  );
};

export default App;