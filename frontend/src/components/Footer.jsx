import {
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import logo from "../assets/CraftLink.svg";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate()
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-col">
          <div className="footer-logo pointer" onClick={()=>navigate("/")}>
            <img src={logo} className="logo-CraftLink" alt="craftlink" />
            <h2>
              CraftLink<span>.</span>
            </h2>
          </div>
          <p className="footer-desc">
            A platform connecting skilled craftsmen with customers and learners.
            Discover, hire, and grow your skills with trusted professionals.
          </p>
          <div className="footer-social">
            <button className="Btn instagram">
              <FaInstagram className="svgIcon" />
              <span className="text">Instagram</span>
            </button>
            <button className="Btn youtube">
              <FaYoutube className="svgIcon" />
              <span className="text">YouTube</span>
            </button>
            <button className="Btn twitter">
              <FaTwitter className="svgIcon" />
              <span className="text">Twitter</span>
            </button>
          </div>
        </div>
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li onClick={()=>navigate("/")}>Home</li>
            <li>Courses</li>
            <li>Craftsmen</li>
            <li>Categories</li>
            <li onClick={()=>navigate("/about")}>About Us</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Popular Crafts</h4>
          <ul>
            <li>Carpentry</li>
            <li>Plumbing</li>
            <li>Electricity</li>
            <li>Painting</li>
            <li>Metal Works</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Support</h4>
          <ul>
            <li onClick={()=>navigate("/helpcenter")}>Help Center</li>
            <li onClick={()=>navigate("/contactus")}>Contact Us</li>
            <li onClick={()=>navigate("/privacy-policy")}>Privacy Policy</li>
            <li onClick={()=>navigate("/terms")}>Terms & Conditions</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-col footer-newsletter">
          <h4>Subscribe</h4>
          <p>Get updates about new craftsmen and courses.</p>
          <div className="newsletter-box">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} CraftLink. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
