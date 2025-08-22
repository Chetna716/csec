import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Home.css';

const Home = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const letters = textRef.current.querySelectorAll('.letter');
    const mainHeading = document.querySelector('.main-heading');
    const subHeading = document.querySelector('.sub-heading');
    const whiteOverlay = document.querySelector('.white-overlay');
    const heroText = document.querySelector('.hero-text');
    
    // Set initial state - letters invisible
    gsap.set(letters, { opacity: 0, y: 50 });
    gsap.set(mainHeading, { opacity: 0, y: 100 });
    gsap.set(subHeading, { opacity: 0, y: 50 });
    gsap.set(whiteOverlay, { x: '100%' });
    gsap.set(heroText, { y: 200, opacity: 0 });
    
    // Create timeline
    const tl = gsap.timeline();
    
    // Animate letters one by one first
    tl.to(letters, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      stagger: 0.15,
      ease: "back.out(1.7)"
    })
    // White overlay sweeps completely from right to left across screen
    .to(whiteOverlay, {
      x: '-50%',
      duration: 0.8,
      ease: "power2.inOut"
    })
    // Hero text slides down from top during white overlay animation
    .to(heroText, {
      y: 0,
      opacity: 1,
      duration: 0.8,
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
    }, "-=0.2");
  }, []);

  return (
    <div className="home">
      <div className="white-overlay"></div>
      <h1 className="hero-text">WE ARE CSEC</h1>
      <div className="csec-container">
        <h1 ref={textRef} className="csec-text">
          <span className="letter">C</span>
          <span className="letter">S</span>
          <span className="letter">E</span>
          <span className="letter">C</span>
        </h1>
      </div>
    </div>
  );
};

export default Home;
