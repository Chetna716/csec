import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = ({ isOpen, onClose }) => {
  const overlayRef = useRef(null);
  const heroHeadingRef = useRef(null);
  const aboutContentRef = useRef(null);
  const [scrollLocked, setScrollLocked] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Lock body scroll
      document.body.style.overflow = 'hidden';
      setScrollLocked(true);
      
      // Animate overlay sliding in from right to left
      gsap.fromTo(overlayRef.current, 
        { x: '100%' },
        { 
          x: '0%', 
          duration: 0.8, 
          ease: "power2.inOut",
          onComplete: () => {
            // Enable scroll within overlay after animation completes
            overlayRef.current.style.overflowY = 'auto';
            setupScrollAnimations();
          }
        }
      );
    } else {
      // Animate overlay sliding out to right
      gsap.to(overlayRef.current, {
        x: '100%',
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => {
          document.body.style.overflow = 'auto';
          setScrollLocked(false);
        }
      });
    }
  }, [isOpen]);

  const setupScrollAnimations = () => {
    // Pin the hero heading while content slides in
    ScrollTrigger.create({
      trigger: heroHeadingRef.current,
      start: "top top",
      end: "+=100vh",
      pin: true,
      pinSpacing: false,
      scroller: overlayRef.current
    });

    // Animate about content sliding in
    gsap.fromTo(aboutContentRef.current,
      { 
        opacity: 0, 
        y: 100 
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: aboutContentRef.current,
          start: "top 80%",
          end: "top 20%",
          scroller: overlayRef.current,
          scrub: 1
        }
      }
    );
  };

  const handleClose = () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* White navbar background overlay */}
      <div className="navbar-overlay" />
      
      <div 
        ref={overlayRef}
        className="about-overlay"
        style={{ overflowY: 'hidden' }}
      >
        {/* Close button */}
        <button className="about-close" onClick={handleClose}>
          ✕
        </button>

      {/* Hero section with pinned heading */}
      <div className="about-hero" ref={heroHeadingRef}>
        <div className="about-hero-content">
          <div className="about-hero-left">
            <h1 className="about-hero-title">
              <span className="about-hero-letter">H</span>
              <span className="about-hero-letter">E</span>
              <span className="about-hero-letter">L</span>
              <span className="about-hero-letter">L</span>
              <span className="about-hero-letter">O</span>
              <span className="about-hero-letter"> </span>
              <span className="about-hero-letter">C</span>
              <span className="about-hero-letter">S</span>
              <span className="about-hero-letter">E</span>
              <span className="about-hero-letter">C</span>
            </h1>
            <div className="about-hero-number">1:</div>
          </div>
          <div className="about-hero-right">
            <div className="about-hero-image">
              <img src="/cseclogo.PNG" alt="CSEC Team" />
            </div>
          </div>
        </div>
      </div>

      {/* About content section */}
      <div className="about-content" ref={aboutContentRef}>
        <div className="about-section">
          <div className="about-quote">
            <p>
              "WE BRING YEARS<br/>
              OF EXPERIENCE BUILDING<br/>
              & SHAPING BRANDS WITH<br/>
              A STEADY HAND OF <span className="highlight">CREATIVITY</span>,<br/>
              <span className="highlight">VISION</span> AND <span className="highlight">COUNSEL</span>."
            </p>
          </div>
          
          <div className="about-details">
            <div className="about-info">
              <h3>COMPUTER SCIENCE & ENGINEERING CLUB</h3>
              <p>INNOVATORS & STORYTELLERS</p>
            </div>
            
            <div className="about-description">
              <p>
                We are a community of passionate developers, designers, and innovators 
                who believe in pushing the boundaries of technology. Our mission is to 
                foster creativity, collaboration, and continuous learning in the field 
                of computer science and engineering.
              </p>
              
              <p>
                From hackathons to workshops, from mentorship programs to industry 
                partnerships, we create opportunities for our members to grow, learn, 
                and make a meaningful impact in the tech world.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default About;