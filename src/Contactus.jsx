import React from "react";
import "./Contactus.css";

function Contactus() {
  return (
    <div className="contactus-page">
      {/* Hero Section */}
      <div className="contact-hero text-center">
        <h1 className="contact-title">📞 Contact Us</h1>
        <p className="contact-subtitle">
          Have questions, feedback, or just want to say hello?  
          We’d love to hear from you!
        </p>
      </div>

      <div className="container py-5">
        {/* Contact Info */}
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="contact-card">
              <div className="icon-circle">📧</div>
              <h5>Email</h5>
              <p>vijay.annareddy1999@gmail.com</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="contact-card">
              <div className="icon-circle">📱</div>
              <h5>Phone</h5>
              <p>+91 7732026214</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="contact-card">
              <div className="icon-circle">📍</div>
              <h5>Address</h5>
              <p>123 Food Street, Hyderabad, India</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="contact-form shadow-lg p-4 p-md-5">
              <h3 className="mb-4 text-success fw-bold">Send Us a Message ✨</h3>
              <form>
                <div className="row g-3">
                  <div className="col-md-6">
                    <input type="text" className="form-control" placeholder="Your Name" required />
                  </div>
                  <div className="col-md-6">
                    <input type="email" className="form-control" placeholder="Your Email" required />
                  </div>
                  <div className="col-12">
                    <textarea className="form-control" rows="5" placeholder="Your Message" required></textarea>
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-success w-100 py-2">
                      Send Message 🚀
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Google Map */}
        <div className="map-container mt-5">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.512365798706!2d78.486671!3d17.385044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99d163aaabcf%3A0xd65f1c58d4bdf0d9!2sHyderabad!5e0!3m2!1sen!2sin!4v1675689956789!5m2!1sen!2sin"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Contactus;
