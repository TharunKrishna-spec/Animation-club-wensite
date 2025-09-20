import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Logo from './Logo';
import ImageWithShimmer from './ImageWithShimmer';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkClasses = "relative text-white py-2 px-3 hover:text-amber-200 transition-all duration-300 group transform active:scale-95";
  const activeNavLinkClasses = "text-amber-300";
  
  const mobileNavLinkClasses = "text-2xl font-semibold text-gray-200 hover:text-amber-300 transition-colors duration-300";

  const renderNavLinks = (isMobile = false) => (
    <>
      <NavLink to="/" className={({ isActive }) => `${isMobile ? mobileNavLinkClasses : navLinkClasses} ${isActive && !isMobile ? activeNavLinkClasses : ''}`}>
        Home
        {!isMobile && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>}
      </NavLink>
      <NavLink to="/departments" className={({ isActive }) => `${isMobile ? mobileNavLinkClasses : navLinkClasses} ${isActive && !isMobile ? activeNavLinkClasses : ''}`}>
        Departments
        {!isMobile && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>}
      </NavLink>
      <NavLink to="/events" className={({ isActive }) => `${isMobile ? mobileNavLinkClasses : navLinkClasses} ${isActive && !isMobile ? activeNavLinkClasses : ''}`}>
        Events
        {!isMobile && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>}
      </NavLink>
      <NavLink to="/leads" className={({ isActive }) => `${isMobile ? mobileNavLinkClasses : navLinkClasses} ${isActive && !isMobile ? activeNavLinkClasses : ''}`}>
        Leads
        {!isMobile && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>}
      </NavLink>
    </>
  );

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <NavLink to="/" className="flex items-center space-x-3 group">
            <div className="transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 ease-in-out">
              <Logo />
            </div>
            <span className="text-2xl font-orbitron font-bold text-white tracking-wider">
              AC<span className="text-amber-300">.</span>VITC
            </span>
          </NavLink>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-4">
            {renderNavLinks()}
            {user ? (
              <div className="flex items-center space-x-4">
                 <ImageWithShimmer
                    src={user.picture}
                    alt={user.name}
                    className="w-10 h-10 rounded-full border-2 border-amber-300 object-cover"
                    wrapperClassName="w-10 h-10 rounded-full"
                  />
                 <button onClick={logout} className="bg-gray-700 text-white font-bold py-2 px-4 rounded-full hover:bg-amber-400 transition-all duration-300 transform active:scale-95">
                  Logout
                 </button>
              </div>
            ) : (
              <Link to="/members" className="btn-shimmer bg-amber-400 text-gray-900 font-bold py-2 px-4 rounded-full hover:bg-amber-300 transition-all duration-300 transform hover:scale-105 active:scale-100 shadow-[0_0_15px_rgba(251,191,36,0.5)]">
                Members Area
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="z-50 relative w-8 h-8 text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <div className="absolute w-full h-full flex items-center justify-center">
                <span className={`block absolute h-0.5 w-6 bg-current transform transition duration-500 ease-in-out ${isMenuOpen ? 'rotate-45' : '-translate-y-2'}`}></span>
                <span className={`block absolute h-0.5 w-6 bg-current transform transition duration-500 ease-in-out ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block absolute h-0.5 w-6 bg-current transform transition duration-500 ease-in-out ${isMenuOpen ? '-rotate-45' : 'translate-y-2'}`}></span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      <div className={`fixed top-0 right-0 z-40 h-full w-full max-w-xs bg-gray-900/95 backdrop-blur-sm shadow-lg transform transition-transform duration-500 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <nav className="flex flex-col items-center justify-center h-full space-y-8">
          {renderNavLinks(true)}
          <div className="pt-8">
          {user ? (
            <div className="flex flex-col items-center space-y-4">
                <ImageWithShimmer
                  src={user.picture}
                  alt={user.name}
                  className="w-16 h-16 rounded-full border-2 border-amber-300 object-cover"
                  wrapperClassName="w-16 h-16 rounded-full"
                />
               <button onClick={logout} className="bg-gray-700 text-white font-bold py-2 px-6 rounded-full hover:bg-amber-400 transition-all duration-300 transform active:scale-95">
                Logout
               </button>
            </div>
          ) : (
            <Link to="/members" className="btn-shimmer bg-amber-400 text-gray-900 font-bold py-3 px-8 rounded-full hover:bg-amber-300 transition-all duration-300 transform hover:scale-105 active:scale-100 shadow-[0_0_15px_rgba(251,191,36,0.5)]">
              Members Area
            </Link>
          )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;