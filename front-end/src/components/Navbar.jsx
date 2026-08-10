import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ cartCount = 0, onNavigate }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white border-b">
      <div className="max-w-container-max mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" onClick={() => onNavigate?.("/")}>
          <img alt="SipNow" className="h-8" src="/logo.png" />
        </Link>

        <div className="flex items-center gap-4">
          <button onClick={() => onNavigate?.("/cart")}>Cart ({cartCount})</button>
          <button onClick={() => setMobileOpen((v) => !v)}>
            {mobileOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>
    </nav>
  );
}