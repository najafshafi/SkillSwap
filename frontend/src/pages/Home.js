import React from "react";
import { useNavigate } from "react-router-dom";
import FeaturesSection from "../components/FeaturesSection";
import CoursesSection from "../components/CoursesSection";
import TestimonialsSection from "../components/TestimonialsSection";

const Home = () => {
  return (
    <div>
      <FeaturesSection />
      <CoursesSection />
      <TestimonialsSection />
    </div>
  );
};

export default Home;
