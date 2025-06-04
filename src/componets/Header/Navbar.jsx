import React, { useState, useEffect, useContext } from "react";
import { Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { AuthContext } from "../../Context/UserContext";
import GlobixLogo from "../../images/globix.png";

const NavLink = ({ to, children, className = "" }) => (
  <Link to={to} className={`group relative px-6 py-3 font-medium text-white/80 transition-all duration-300 rounded-full hover:text-white hover:bg-red-500/20 hover:scale-105 ${className}`}>
    <span className="relative z-10">{children}</span>
    <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-600/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  </Link>
);

const IconButton = ({ children, className = "", ...props }) => (
  <div className={`group relative p-3 rounded-xl bg-white/5 hover:bg-red-500/20 border border-white/20 hover:border-red-500/50 backdrop-blur-sm shadow-lg hover:shadow-red-500/20 transform hover:scale-110 transition-all duration-300 ${className}`} {...props}>
    {children}
  </div>
);

function Navbar({ playPage }) {
  const { User } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(getAuth());
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/series", label: "Movies & Shows" },
    { to: "/history", label: "Support" },
    { to: "/liked", label: "Subscriptions" },
    { to: "/mylist", label: "My Lists" }
  ];

  const profileMenuItems = [
    { to: "/profile", label: "Profile", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
    { to: "/signin", label: "Add User", icon: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" }
  ];

  const defaultAvatar = "https://www.citypng.com/public/uploads/preview/profile-user-round-red-icon-symbol-download-png-11639594337tco5j3n0ix.png";

  return (
    <header className={`fixed top-0 z-50 w-full ${playPage ? "backdrop-blur-md border-b border-white/10" : ""}`}>
      <nav className={`transition-all duration-500 ease-out ${isScrolled ? "bg-black/95 backdrop-blur-3xl shadow-2xl shadow-black/50 border-b border-white/10" : "border-b border-white/5"}`}>
        <div className="px-6 mx-auto w-full sm:px-8 lg:px-16 xl:px-20">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 transform hover:scale-110 transition-transform duration-300">
              <div className="p-2 rounded-xl bg-gradient-to-r from-white/5 to-white/10 border border-white/20 shadow-lg hover:shadow-white/20 transition-all duration-300">
                <img className="h-10 w-auto brightness-110 hover:brightness-125 transition-all duration-300" src={GlobixLogo} alt="GLOBIX" />
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
              
              {/* Search */}
              <Link to="/search">
                <IconButton>
                  <svg className="w-5 h-5 text-white/80 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </IconButton>
              </Link>

              {/* Notifications */}
              <div className="hidden md:block relative">
                <IconButton>
                  <svg className="w-5 h-5 text-white/80 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full border-2 border-black animate-pulse" />
                </IconButton>
              </div>

              {/* Profile Dropdown */}
              <div className="group relative">
                <Link to="/profile">
                  <div className="relative p-1 rounded-full bg-gradient-to-r from-white/10 to-white/20 group-hover:from-red-500/20 group-hover:to-red-600/30 border border-white/30 group-hover:border-red-500/50 shadow-lg hover:shadow-red-500/20 transform hover:scale-110 transition-all duration-300">
                    <img className="h-10 w-10 rounded-full object-cover" src={User?.photoURL || defaultAvatar} alt="Profile" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-red-500/20 to-red-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </Link>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 top-full mt-3 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="bg-black/95 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
                    {profileMenuItems.map(({ to, label, icon }) => (
                      <Link key={to} to={to} className="flex items-center space-x-3 px-6 py-4 hover:bg-red-500/20 transition-all duration-300 group/item">
                        <svg className="w-5 h-5 text-white/70 group-hover/item:text-red-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                        </svg>
                        <span className="font-medium text-white/90 group-hover/item:text-red-400 transition-colors duration-300">{label}</span>
                      </Link>
                    ))}
                    
                    <div className="border-t border-white/20">
                      <button onClick={handleSignOut} className="w-full flex items-center space-x-3 px-6 py-4 hover:bg-red-500/20 transition-all duration-300 group/item">
                        <svg className="w-5 h-5 text-white/70 group-hover/item:text-red-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span className="font-medium text-white/90 group-hover/item:text-red-400 transition-colors duration-300">Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

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
        <Transition
          show={isOpen}
          enter="transition ease-out duration-300 transform"
          enterFrom="opacity-0 scale-95 -translate-y-4"
          enterTo="opacity-100 scale-100 translate-y-0"
          leave="transition ease-in duration-200 transform"
          leaveFrom="opacity-100 scale-100 translate-y-0"
          leaveTo="opacity-0 scale-95 -translate-y-4"
        >
          <div className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-white/10">
            <div className="px-6 py-6 space-y-2">
              {navLinks.map(({ to, label }) => (
                <Link key={to} to={to} className="block px-6 py-4 text-white/80 rounded-xl hover:bg-red-500/20 hover:text-red-400 transition-all duration-300 border border-transparent hover:border-red-500/30">
                  {label}
                </Link>
              ))}
              
              <div className="border-t border-white/10 pt-4 mt-4 space-y-2">
                <Link to="/signin" className="block px-6 py-4 text-white/80 rounded-xl hover:bg-red-500/20 hover:text-red-400 transition-all duration-300">
                  Add User
                </Link>
                <button onClick={handleSignOut} className="w-full text-left px-6 py-4 text-red-400 rounded-xl hover:bg-red-500/10 hover:text-red-300 transition-all duration-300">
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </nav>
    </header>
  );
}

export default Navbar;