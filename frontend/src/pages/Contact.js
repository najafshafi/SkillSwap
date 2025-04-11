import React, { useState, useRef } from "react";
import "../styles/Contact.css"; // Ensure correct CSS path
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Using EmailJS to send email
    // You need to sign up at emailjs.com and get your own service ID, template ID, and public key
    emailjs.sendForm(
      'service_7z9yc8o', // Replace with your EmailJS service ID
      'template_rba488q', // Replace with your EmailJS template ID
      form.current,
      'tceB102LPTbrndB1E' // Replace with your EmailJS public key
    )
      .then((result) => {
        console.log('Email sent successfully:', result.text);
        setLoading(false);
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });

        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      })
      .catch((error) => {
        console.error('Failed to send email:', error.text);
        setLoading(false);
        setError("Failed to send message. Please try again later.");
      });
  };

  return (
    <div className="container-fluid px-0">
      {/* ✅ White Space Above Contact Section */}

      {/* ✅ Hero Section */}
      <div className="text-center py-5 contact-header">
        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-subtitle">Get in touch with us anytime!</p>
      </div>

      <div className="container contact-container">
        {/* ✅ Top Heading - Smaller & Above Form */}
        <div className="text-left mb-3">
          <h3 className="contact-heading-small">
            We are always open 24/7
            <br /> for you
          </h3>
        </div>

        {/* ✅ Contact Section (Form + Info Side by Side) */}
        <div className="row align-items-start contact-content">
          {/* ✅ Left Side - Contact Form */}
          <div className="col-md-6">
            {submitted && (
              <div className="alert alert-success mb-4">
                Thank you for your message! We'll get back to you soon.
              </div>
            )}

            {error && (
              <div className="alert alert-danger mb-4">
                {error}
              </div>
            )}

            <form className="contact-form" ref={form} onSubmit={handleSubmit}>
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                required
                className="form-control mb-3"
                value={formData.name}
                onChange={handleChange}
              />

              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="form-control mb-3"
                value={formData.email}
                onChange={handleChange}
              />

              <label>Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="Enter subject"
                required
                className="form-control mb-3"
                value={formData.subject}
                onChange={handleChange}
              />

              <label>Message</label>
              <textarea
                name="message"
                placeholder="Enter your message"
                required
                className="form-control mb-3"
                rows="4"
                value={formData.message}
                onChange={handleChange}
              ></textarea>

              {/* Hidden field for recipient email */}
              <input
                type="hidden"
                name="to_email"
                value="najafshafi.online@gmail.com"
              />

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* ✅ Right Side - Contact Info (Shifted Right & Smaller Width) */}
          <div className="col-md-5 offset-md-1 contact-info">
            <h4>Call Us</h4>
            <p>+1-800-999-555</p>
            <p>+1-800-999-777</p>

            <h4>Email Us</h4>
            <p>support@gmail.com</p>
            <p>helpdesk@gmail.com</p>

            <h4>Visit Us</h4>
            <p>34 Madison Street, NY, USA</p>
          </div>
        </div>
      </div>

      {/* ✅ Internal CSS */}
      <style>
        {`
        /* Hero Section */
          .contact-header {
            background: linear-gradient(90deg, #6a11cb, #2575fc);
            color: white;
            padding: 50px 0;
          }

          .contact-title {
            font-size: 2.5rem;
            font-weight: bold;
            font-family: Arial, sans-serif;
          }

          .contact-subtitle {
            margin-top: 20px;
            letter-spacing: 0.5px;
            font-size: 1.1rem;
          }

          .contact-container {
            padding: 50px 15px;
          }

          .contact-heading-small {
            font-size: 1.5rem;
            font-weight: bold;
            color: #333;
            text-align: left;
          }

          .contact-content {
            display: flex;
            justify-content: space-between;
          }

          .contact-form {
            background: #f8f9fa;
            padding: 25px;
            border-radius: 10px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
          }

          .contact-form label {
            font-weight: bold;
            margin-bottom: 5px;
            display: block;
          }

          .contact-form input, .contact-form textarea {
            width: 100%;
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 10px;
            font-size: 1rem;
          }

          .contact-info {
            padding-left: 60px; /* Form se thoda door ho */
            
          }

          .contact-info h4 {
            font-weight: bold;
            color: #333;
            margin-top: 20px;
          }

          .contact-info p {
            font-size: 1.1rem;
            margin-bottom: 10px;
          }

          @media (max-width: 768px) {
            .contact-content {
              flex-direction: column;
            }
            .contact-info {
              padding-left: 0;
              margin-top: 20px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Contact;
