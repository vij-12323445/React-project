import React from "react";
import "./Aboutus.css";

function About() {
  return (
    <div className="aboutus-container">
      <header className="aboutus-top">
        <h1 className="aboutus-title">ℹ About Us</h1>
        <p className="aboutus-subtitle">
          Welcome to <strong>Foodie's Paradise</strong> — your one-stop destination for
          tasty Veg, Non-Veg, Drinks, and Sweets. We believe good food brings people
          together; our goal is to serve happiness with every bite. 🍴✨
        </p>
      </header>

      {/* Mission / Vision / Values */}
      <section className="aboutus-cards">
        <article className="aboutus-card">
          <div className="icon-circle" aria-hidden>🎯</div>
          <h3>Our Mission</h3>
          <p>
            To provide fresh, hygienic, and delicious food that delights our customers.
            From traditional Indian dishes to global flavors — only the best on your plate.
          </p>
        </article>

        <article className="aboutus-card">
          <div className="icon-circle" aria-hidden>💡</div>
          <h3>Our Vision</h3>
          <p>
            To be the most loved food brand — serving meals that create memories and
            spread joy across every home.
          </p>
        </article>

        <article className="aboutus-card">
          <div className="icon-circle" aria-hidden>👥</div>
          <h3>Our Values</h3>
          <p>
            Quality, transparency, sustainability and customer happiness — we put people first.
          </p>
        </article>
      </section>

      {/* Team */}
      <section className="aboutus-team">
        <h2>👨‍🍳 Meet Our Team</h2>
        <div className="team-members">
          <div className="team-card">
            <img src="Image/Teju.png" alt="Ravi Kumar — Head Chef" />
            <h4>Teju Reddy</h4>
            <p>Head Chef</p>
          </div>
          <div className="team-card">
            <img src="Image/me.jpg" alt="Anita Sharma — Restaurant Manager" />
            <h4>Vijay Reddy</h4>
            <p>Restaurant Manager</p>
          </div>
          <div className="team-card">
            <img src="https://i.pravatar.cc/150?img=8" alt="Vikram Singh — Marketing Lead" />
            <h4>Sunil Krishna</h4>
            <p>Marketing Lead</p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="aboutus-contact">
        <h2>📞 Get in Touch</h2>
        <div className="contact-info">
          <p><span className="contact-emoji">✉️</span> <a href="mailto:support@foodiesparadise.com">support@foodiesparadise.com</a></p>
          <p><span className="contact-emoji">📱</span> <a href="tel:+917732026214">+91 77320 26214</a></p>
          <p><span className="contact-emoji">📍</span> Hyderabad, India</p>
        </div>
      </section>
    </div>
  );
}

export default About;
