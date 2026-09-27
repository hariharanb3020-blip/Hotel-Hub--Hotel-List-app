import { Link, useLocation } from "react-router-dom";
import "./Header.css";

function Header() {
  const location = useLocation();

  return (
    <header className="header">
      <Link to="/" className="header-logo">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 14c-1.66 0-3-1.34-3-3s1.34-3 3-3h1V6H7C4.24 6 2 8.24 2 11s2.24 5 5 5h1v-2H7zm3-4h4v2h-4v-2zm7-4h-1v2h1c1.66 0 3 1.34 3 3s-1.34 3-3 3h-1v2h1c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
          <path d="M19 5V3h-2v2h-2v2h2v2h2V7h2V5h-2zM3 19h18v2H3v-2z" />
        </svg>
        HotelHub
      </Link>
      <nav className="header-nav">
        <Link to="/" className={location.pathname === "/" ? "active" : ""}>
          Hotels
        </Link>
        <Link
          to="/add"
          className={location.pathname === "/add" ? "active" : ""}
        >
          Add Hotel
        </Link>
      </nav>
    </header>
  );
}

export default Header;
