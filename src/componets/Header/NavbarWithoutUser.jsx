import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StreamVibeLogo from "../../images/StreamVibe.png";

const NavLink = ({ to, children, className = "" }) => (
  <Link to={to} className={`group relative px-6 py-3 font-medium text-white/80 transition-all duration-300 rounded-full hover:text-white hover:bg-red-500/20 hover:scale-105 ${className}`}>
    <span className="relative z-10">{children}</span>
    <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-600/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  </Link>
);

function NavbarWithoutUser() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/series", label: "Movies & Shows" },
    { to: "/history", label: "Support" },
    { to: "/liked", label: "Subscriptions" }
  ];

  return (
    <header className="fixed top-0 z-50 w-full">
      <nav className={`transition-all duration-500 ease-out ${isScrolled ? "bg-black/95 backdrop-blur-3xl shadow-2xl shadow-black/50 border-b border-white/10" : "border-b border-white/5"}`}>
        <div className="px-6 mx-auto w-full sm:px-8 lg:px-16 xl:px-20">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 transform hover:scale-110 transition-transform duration-300">
              <div className="p-2 rounded-xl bg-gradient-to-r from-white/5 to-white/10 border border-white/20 shadow-lg hover:shadow-white/20 transition-all duration-300">
                <img className="h-10 w-auto brightness-110 hover:brightness-125 transition-all duration-300" src={StreamVibeLogo} alt="GLOBIX" />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-center flex-1 px-8">
              <div className="flex items-center space-x-1 bg-white/5 backdrop-blur-xl rounded-full px-2 py-2 border border-white/20 shadow-xl">
                {navLinks.map(({ to, label }) => (
                  <NavLink key={to} to={to}>{label}</NavLink>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              
              {/* Login Button */}
              <Link to="/signin">
                <button className="group relative px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold rounded-xl border border-red-500/50 hover:border-red-400/70 shadow-lg hover:shadow-red-500/30 transform hover:scale-105 transition-all duration-300 backdrop-blur-sm">
                  <span className="relative z-10">Login</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-600/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2.5 text-white/70 bg-white/5 rounded-xl hover:text-white hover:bg-white/10 border border-white/10 transition-all duration-300"
              >
                <svg className={`w-6 h-6 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-white/10 transition-all duration-300">
            <div className="px-6 py-6 space-y-2">
              {navLinks.map(({ to, label }) => (
                <Link key={to} to={to} className="block px-6 py-4 text-white/80 rounded-xl hover:bg-red-500/20 hover:text-red-400 transition-all duration-300 border border-transparent hover:border-red-500/30">
                  {label}
                </Link>
              ))}
              
              <div className="border-t border-white/10 pt-4 mt-4">
                <Link to="/signin" className="block px-6 py-4 text-center bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold rounded-xl transition-all duration-300">
                  Login
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default NavbarWithoutUser;