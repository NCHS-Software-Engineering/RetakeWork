import React, { useEffect } from 'react';
import { gsap, Linear } from 'gsap';
import './ErrorPage.css';

const ErrorPage = () => {
  useEffect(() => {
    const t1 = gsap.timeline();
    const t2 = gsap.timeline();
    const t3 = gsap.timeline();

    t1.to('.cog1', {
      transformOrigin: '50% 50%',
      rotation: '+=360',
      repeat: -1,
      ease: Linear.easeNone,
      duration: 8,
    });

    t2.to('.cog2', {
      transformOrigin: '50% 50%',
      rotation: '-=360',
      repeat: -1,
      ease: Linear.easeNone,
      duration: 8,
    });

    t3.fromTo(
      '.wrong-para',
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        stagger: {
          repeat: -1,
          yoyo: true,
        },
      }
    );

    return () => {
      t1.kill();
      t2.kill();
      t3.kill();
    };
  }, []);

  return (
    <div className="container">
      <h1 className="first-four">4</h1>
      <div className="cog-wheel1">
        <div className="cog1">
          <div className="top"></div>
          <div className="down"></div>
          <div class="left-top"></div>
          <div class="left-down"></div>
          <div class="right-top"></div>
          <div class="right-down"></div>
          <div class="left"></div>
          <div class="right"></div>
        </div>
      </div>

      <div className="cog-wheel2">
        <div className="cog2">
          <div class="top"></div>
          <div class="down"></div>
          <div class="left-top"></div>
          <div class="left-down"></div>
          <div class="right-top"></div>
          <div class="right-down"></div>
          <div class="left"></div>
          <div class="right"></div>
        </div>
      </div>
      
      <h1 className="second-four">4</h1>
      <p className="wrong-para">Uh Oh! Page not found!</p>
    </div>
  );
};

export default ErrorPage;