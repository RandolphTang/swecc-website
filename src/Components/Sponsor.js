import "../CSS/Sponsor.css";
import "../CSS/Officers.css";
import React, { useState } from "react";
import deloitteLogo from "../Data/img/Sponsors/Deloitte.png";
import SponsorEmail from "./email/SponsorEmail";
import { Resend } from "resend";

function Sponsor() {
  const resend = new Resend(process.env.REACT_APP_RESEND_API_KEY);
  const [ContentSelected, setContentSelected] = useState("sponsor");
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, company, message } = contactData;

    try {
      await resend.emails.send({
        from: "tang1125@uw.edu",
        to: "y031125k@gmail.com",
        subject: `New Connection from ${name} at ${company}`,
        react: SponsorEmail({ name, company, message }),
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleContentChange = (content) => {
    setContentSelected(content);
  };

  const Sponsors = () => (
    <div>
      <div className="Sponsors-Info">
        <h2>Our Sponsors</h2>
        <h3>{new Date().getFullYear()}</h3>
        <p>
          We value the supports of our sponsors, and we are thankful for their{" "}
          <br />
          supports that promotes many technical SWECC events which enables
          thousands of <br />
          students and professionals to communicate and share new insights. We
          want more <br />
          to know how those valuable partners have helped us and how they can
          further support <br />
          our community as well.
        </p>
      </div>

      <div className="Sponsors-Logo">
        <img src={deloitteLogo} alt="Deloitte Img" />
      </div>
    </div>
  );

  const WhyUs = () => (
    <div>
      <div className="WhyUs-Info">
        <h2>Why Sponsor</h2>
        <p id="HowToSponsorIntro">
          Sponsoring SWECC to connect with 1,000+ UW CS students. Our <br />
          industry-focused events offer prime recruitment opportunities and{" "}
          <br />
          exposure. We promote your products and services through weekly
          seminars, <br />
          large-scale hackathons, and more.
        </p>

        <h2>How to Sponsor</h2>
        <div className="HowToSponsor">
          <p>
            We appreciate all forms of your supports, you can support us by:
          </p>
          <ul>
            <li>
              Host a seminar sharing your valuable insights with UW members
            </li>
            <li>Sponsor our technical events such as Hackathon</li>
            <li>
              Sponsor coding competitions with company-specific challenges
            </li>
            <li>
              Provide mentorship opportunities or career coaching sessions
            </li>
            <li>
              Provide financial support for club operations and event costs
            </li>
            <li>Sponsor networking events or industry mixers</li>
          </ul>
        </div>

        <div className="contact-info">
          <h2 id="contact-info-title">Connect with Us</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <input
              type="text"
              name="name"
              value={contactData.name}
              onChange={handleChange}
              placeholder="Name"
              required
            />
            <input
              type="email"
              name="email"
              value={contactData.email}
              onChange={handleChange}
              placeholder="Email address"
              required
            />
            <input
              type="text"
              name="company"
              value={contactData.company}
              onChange={handleChange}
              placeholder="Company"
            />
            <textarea
              name="message"
              value={contactData.message}
              onChange={handleChange}
              placeholder="Message"
            ></textarea>
            <button type="submit">SUBMIT</button>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="sponsor-page">
        <div className="sponsor-page-intro">
          <h1 className="sponsor-headers">Sponsors & Connection</h1>
        </div>

        <div className="sponsor-content">
          <nav className="sponsor-sidebar">
            <h2>Fundraising</h2>
            <ul>
              {["sponsor", "why us"].map((content) => (
                <li>
                  <button
                    onClick={() => handleContentChange(content)}
                    className={ContentSelected === content ? "selected" : ""}
                  >
                    {content}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="sponsorConnectionContent">
            {ContentSelected === "sponsor" && Sponsors()}
            {ContentSelected === "why us" && WhyUs()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sponsor;
