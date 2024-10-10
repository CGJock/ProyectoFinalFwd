import "../../../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <a href="/">
          
            <img src="path_to_logo" alt="Logo" />
          </a>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <a href="/">Home</a>
          <a href="/list-layout">List Layout</a>
          <a href="/blog">Blog</a>
          <a href="/contact">Contact</a>
        </div>

        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p>costa rica puntarenas</p>
          <p>+601879009</p>
          <p>sales@example.com</p>
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

        <div className="footer-social">
          <a
            href="https://www.facebook.com/tu_pagina_de_facebook"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://twitter.com/tu_cuenta_de_twitter"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://www.instagram.com/tu_cuenta_de_instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram"></i>
          </a>
          {/* Agrega más íconos según necesites */}
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
