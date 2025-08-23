import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import './Navbar.css';

const Navbar = ({ onAboutClick }) => {
  useEffect(() => {
    const navItems = document.querySelectorAll('.nav-item');
    const getInTouch = document.querySelector('.get-in-touch');
    
    // Set initial state - nav items invisible
    gsap.set(navItems, { opacity: 0, y: -20 });
    gsap.set(getInTouch, { opacity: 0, y: -20 });
    
    // Animate nav items after hero text completes (delay to sync with main animation)
    gsap.to(navItems, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
      delay: 2.5 // Adjust this delay to sync with hero text completion
    });
    
    gsap.to(getInTouch, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      delay: 2.8
    });
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <img src="/cseclogo.PNG" alt="CSEC" className="logo" />
      </div>
      <div className="nav-center">
        <button onClick={onAboutClick} className="nav-item">ABOUT</button>
        <a href="#gallery" className="nav-item">GALLERY</a>
        <a href="#team" className="nav-item">TEAM</a>
      </div>
      <div className="nav-right">
        <a href="#contact" className="get-in-touch">GET IN TOUCH</a>
      </div>
    </nav>
  );
};

export default Navbar;
