import "../../../styles/footer.css";
// import instagram from '../../../logos-img';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <a href="/"></a>
        </div>


        <div className="footer-links">
          <h3>links</h3>
          <a href="/">Home</a>
        </div>
        <div className="footer-social">
          <a
            href="https://www.facebook.com/tu_pagina_de_facebook"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          <a
            href="https://twitter.com/tu_cuenta_de_twitter"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          <a
            href="https://www.instagram.com/tu_cuenta_de_instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>

          {/* <img src={instagram} alt="logo" /> */}
        </div>

      </div>
      <div className="footer-contact-me">
        <h3>Contact Us</h3>
        <p>Email: support@yourdomain.com</p>
        <p>Phone: </p>
        <p>Address:</p>
      </div>

      <div className="footer-remain-updated">
          <h3>Remain Updated</h3>
          <input
            type="email"
            placeholder="Your email address"
            className="footer-email-input"
          />
          <button className="footer-signup-btn">Sign Up</button>
        </div>

      <div className="footer-top">
        <button onClick={() => window.scrollTo(0, 0)}>Back to Top</button>
      </div>

      <div className="footer-bottom">
        <p>&copy;todos los derechos reservados 2024</p>
      </div>
    </footer>
  );
};

export default Footer;
