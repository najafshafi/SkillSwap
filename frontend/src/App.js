import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import Home from "./pages/Home";
import Courses from "./pages/Courses";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import AppNavbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import CartPage from "./components/CartPage";
import Footer from "./components/Footer";
import EnrollmentPage from "./pages/courses/EnrollmentPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile"; // Corrected import
import EnrolledCourses from "./pages/EnrolledCourses"; // New page for enrolled courses
import AddCourse from "./pages/Admin/AddCourse"; // Admin page for adding courses
import CourseView from "./pages/CourseView"; // Dynamic course view component
import { AuthProvider, useAuth } from "./utils/AuthContext";

// Importing all courses
import LogoDesign from "./pages/courses/LogoDesign";
import UIUXDesign from "./pages/courses/UIUXDesign";
import MotionGraphics from "./pages/courses/MotionGraphics";
import WebDevelopment from "./pages/courses/WebDevelopment";
import MobileAppDevelopment from "./pages/courses/MobileAppDevelopment";
import GameDevelopment from "./pages/courses/GameDevelopment";
import DataScience from "./pages/courses/DataScience";
import BigData from "./pages/courses/BigData";
import MachineLearning from "./pages/courses/MachineLearning";
import EthicalHacking from "./pages/courses/EthicalHacking";
import NetworkSecurity from "./pages/courses/NetworkSecurity";
import CloudSecurity from "./pages/courses/CloudSecurity";
import SEO from "./pages/courses/SEO";
import SocialMediaMarketing from "./pages/courses/SocialMediaMarketing";
import ContentMarketing from "./pages/courses/ContentMarketing";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
};

// Separate AppContent component to use useNavigate() and useAuth()
const AppContent = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading, logout, user } = useAuth();
  const [navbarProfilePic, setNavbarProfilePic] = React.useState(
    localStorage.getItem("profilePic") || "default-avatar.png"
  );

  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (loading) {
      return <div>Loading...</div>;
    }
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  // Admin route component
  const AdminRoute = ({ children }) => {
    if (loading) {
      return <div>Loading...</div>;
    }

    // Check if user is authenticated and is an admin
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    if (!user || !user.isAdmin) {
      return <Navigate to="/home" />;
    }

    return children;
  };

  return (
    <div>
      <AppNavbar
        isAuthenticated={isAuthenticated}
        onLogout={logout}
        navbarProfilePic={navbarProfilePic}
        showEnrolledCourses={isAuthenticated}
        isAdmin={user?.isAdmin}
      />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Root path - redirect to home if authenticated, otherwise to login */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home onLogout={logout} />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/add-course"
          element={
            <AdminRoute>
              <AddCourse />
            </AdminRoute>
          }
        />

        {/* Existing Protected Routes */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses/enroll"
          element={
            <ProtectedRoute>
              <EnrollmentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile
                profilePic={navbarProfilePic}
                setNavbarProfilePic={setNavbarProfilePic}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/enrolled-courses"
          element={
            <ProtectedRoute>
              <EnrolledCourses />
            </ProtectedRoute>
          }
        />

        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/courses" element={<Courses />} />

        {/* Dynamic course route that will handle any course URLs */}
        <Route path="/course/:courseUrl" element={
          <ProtectedRoute>
            <CourseView />
          </ProtectedRoute>
        } />

        {/* Static Course Routes - these will be matched first before the dynamic route */}
        <Route path="/course/logo-designing" element={
          <ProtectedRoute>
            <LogoDesign />
          </ProtectedRoute>
        } />
        <Route path="/course/ui/ux-designing" element={
          <ProtectedRoute>
            <UIUXDesign />
          </ProtectedRoute>
        } />
        <Route path="/course/motion-graphics" element={
          <ProtectedRoute>
            <MotionGraphics />
          </ProtectedRoute>
        } />
        <Route path="/course/web-development" element={
          <ProtectedRoute>
            <WebDevelopment />
          </ProtectedRoute>
        } />
        <Route path="/course/mobile-app-development" element={
          <ProtectedRoute>
            <MobileAppDevelopment />
          </ProtectedRoute>
        } />
        <Route path="/course/game-development" element={
          <ProtectedRoute>
            <GameDevelopment />
          </ProtectedRoute>
        } />
        <Route path="/course/data-science" element={
          <ProtectedRoute>
            <DataScience />
          </ProtectedRoute>
        } />
        <Route path="/course/big-data" element={
          <ProtectedRoute>
            <BigData />
          </ProtectedRoute>
        } />
        <Route path="/course/machine-learning" element={
          <ProtectedRoute>
            <MachineLearning />
          </ProtectedRoute>
        } />
        <Route path="/course/ethical-hacking" element={
          <ProtectedRoute>
            <EthicalHacking />
          </ProtectedRoute>
        } />
        <Route path="/course/network-security" element={
          <ProtectedRoute>
            <NetworkSecurity />
          </ProtectedRoute>
        } />
        <Route path="/course/cloud-security" element={
          <ProtectedRoute>
            <CloudSecurity />
          </ProtectedRoute>
        } />
        <Route path="/course/seo" element={
          <ProtectedRoute>
            <SEO />
          </ProtectedRoute>
        } />
        <Route path="/course/social-media-marketing" element={
          <ProtectedRoute>
            <SocialMediaMarketing />
          </ProtectedRoute>
        } />
        <Route path="/course/content-marketing" element={
          <ProtectedRoute>
            <ContentMarketing />
          </ProtectedRoute>
        } />

        {/* Catch-all route */}
        <Route
          path="*"
          element={
            isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />
          }
        />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
