import "../styles/global.css";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-col">
          <h3>LUXVASTRA</h3>
          <p>Email:</p>
          <p>Phone:</p>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <p>About Us</p>
          <p>Careers</p>
          <p>Terms & Conditions</p>
          <p>Privacy Policy</p>
        </div>

        <div className="footer-col">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <i className="ri-facebook-fill"></i>
            <i className="ri-instagram-line"></i>
            <i className="ri-twitter-x-line"></i>
            <i className="ri-youtube-fill"></i>
          </div>
        </div>

        <div className="footer-col">
          <h4>Download App</h4>
          <img
            src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
            alt="appstore"
            className="store-btn"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
            alt="playstore"
            className="store-btn"
          />
        </div>

      </div>

      <div className="payments">
        <img src="https://img.icons8.com/color/48/visa.png" alt="visa" />
        <img src="https://img.icons8.com/color/48/mastercard-logo.png" alt="mastercard" />
        <img src="https://img.icons8.com/color/48/paypal.png" alt="paypal" />
        <img src="https://img.icons8.com/color/48/google-pay-india.png" alt="gpay" />
        <img src="https://img.icons8.com/color/48/apple-pay.png" alt="applepay" />
      </div>

    </footer>
  );
}