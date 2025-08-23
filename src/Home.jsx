import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './Home.css';
import Navbar from './Navbar';
import About from './About';

const Home = () => {
  const textRef = useRef(null);
  const [aboutOpen, setAboutOpen] = useState(false);

  useEffect(() => {
    const letters = textRef.current.querySelectorAll('.letter');
    const mainHeading = document.querySelector('.main-heading');
    const subHeading = document.querySelector('.sub-heading');
    const whiteOverlay = document.querySelector('.white-overlay');
    const heroLetters = document.querySelectorAll('.hero-letter');
    const heroTagline = document.querySelector('.hero-tagline');
    
    // Set initial state - letters invisible
    gsap.set(letters, { opacity: 0, y: 50 });
    gsap.set(mainHeading, { opacity: 0, y: 100 });
    gsap.set(subHeading, { opacity: 0, y: 50 });
    gsap.set(whiteOverlay, { x: '100%' });
    gsap.set(heroLetters, { opacity: 0, y: 200 });
    gsap.set(heroTagline, { opacity: 0, y: 30 });
    
    // Create timeline
    const tl = gsap.timeline();
    
    // Animate letters one by one first
    tl.to(letters, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: "power2.out"
    })
    // White overlay sweeps completely from right to left across screen
    .to(whiteOverlay, {
      x: '-50%',
      duration: 0.8,
      ease: "power2.inOut"
    })
    // Hero letters slide up from bottom one by one during white overlay animation
    .to(heroLetters, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.08,
      ease: "power2.out"
    }, "-=0.8")
    // Then animate main heading
    .to(mainHeading, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4")
    // Finally animate sub heading
    .to(subHeading, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "power2.out"
    }, "-=0.2")
    // Animate hero tagline with navbar (at 2.5 seconds to sync with navbar animation)
    .to(heroTagline, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, 2.5);
  }, []);

  return (
    <div className="home">
      <Navbar onAboutClick={() => setAboutOpen(true)} />
      <div className="white-overlay"></div>
      <div className="hero-container">
        <h1 className="hero-text">
          <span className="hero-letter">W</span>
          <span className="hero-letter">E</span>
          <span className="hero-letter"> </span>
          <span className="hero-letter">A</span>
          <span className="hero-letter">R</span>
          <span className="hero-letter">E</span>
          <span className="hero-letter"> </span>
          <span className="hero-letter">C</span>
          <span className="hero-letter">S</span>
          <span className="hero-letter">E</span>
          <span className="hero-letter">C</span>
        </h1>
        <p className="hero-tagline">BEYOND CODE, TOWARDS INNOVATION</p>
      </div>
      <div className="csec-container">
        <h1 ref={textRef} className="csec-text">
          <span className="letter">C</span>
          <span className="letter">S</span>
          <span className="letter">E</span>
          <span className="letter">C</span>
        </h1>
      </div>
      <About isOpen={aboutOpen} onClose={() => setAboutOpen(false)} />
    </div>
  );
};

export default Home;
