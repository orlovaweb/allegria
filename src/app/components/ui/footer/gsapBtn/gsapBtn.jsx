import gsap from "gsap";
import React, { useState } from "react";
import "./gsapBtn.scss";

const GsapBtn = () => {
  const gsapButton = gsap.timeline();
  const [isShowAnimation, setShowAnimation] = useState(false);
  // let button = document.querySelector("button");

  const handleClick = (e) => {
    e.preventDefault();

    if (!isShowAnimation) {
      setShowAnimation(true);

      gsapButton.to(".btn", {
        keyframes: [
          {
            "--left-wing-first-x": "50%",
            "--left-wing-first-y": "100%",
            "--right-wing-second-x": "50%",
            "--right-wing-second-y": "100%",
            duration: 0.2,
            onComplete() {
              gsapButton.set(".btn", {
                "--left-wing-first-y": "0%",
                "--left-wing-second-x": "40%",
                "--left-wing-second-y": "100%",
                "--left-wing-third-x": "0%",
                "--left-wing-third-y": "100%",
                "--left-body-third-x": "40%",
                "--right-wing-first-x": "50%",
                "--right-wing-first-y": "0%",
                "--right-wing-second-x": "60%",
                "--right-wing-second-y": "100%",
                "--right-wing-third-x": "100%",
                "--right-wing-third-y": "100%",
                "--right-body-third-x": "60%"
              });
            }
          },
          {
            "--left-wing-third-x": "20%",
            "--left-wing-third-y": "90%",
            "--left-wing-second-y": "90%",
            "--left-body-third-y": "90%",
            "--right-wing-third-x": "80%",
            "--right-wing-third-y": "90%",
            "--right-body-third-y": "90%",
            "--right-wing-second-y": "90%",
            duration: 0.2
          },
          {
            "--rotate": "50deg",
            "--left-wing-third-y": "95%",
            "--left-wing-third-x": "27%",
            "--right-body-third-x": "45%",
            "--right-wing-second-x": "45%",
            "--right-wing-third-x": "60%",
            "--right-wing-third-y": "83%",
            duration: 0.25
          },
          {
            "--rotate": "60deg",
            "--plane-x": "-8px",
            "--plane-y": "40px",
            duration: 0.2
          },
          {
            "--rotate": "40deg",
            "--plane-x": "45px",
            "--plane-y": "-300px",
            "--plane-opacity": 0,
            duration: 0.375,
            onComplete() {
              setTimeout(() => {
                // button.removeAttribute("style");
                gsapButton.fromTo(
                  ".btn",
                  {
                    opacity: 0,
                    y: -8
                  },
                  {
                    opacity: 1,
                    y: 0,
                    clearProps: true,
                    duration: 0.3,
                    onComplete() {
                      setShowAnimation(false);
                    }
                  }
                );
              }, 2500);
            }
          }
        ]
      });

      gsapButton.to(".btn", {
        keyframes: [
          {
            "--text-opacity": 0,
            "--border-radius": "0px",
            "--left-wing-background": "#2055EE",
            "--right-wing-background": "#2055EE",
            duration: 0.1
          },
          {
            "--left-wing-background": "#275EFE",
            "--right-wing-background": "#275EFE",
            duration: 0.15
          },
          {
            "--left-body-background": "#2055EE",
            "--right-body-background": "#133FC0",
            duration: 0.25,
            delay: 0.1
          },
          {
            "--trails-stroke": "171px",
            duration: 0.22,
            delay: 0.22
          },
          {
            "--success-opacity": 1,
            "--success-x": "0px",
            duration: 0.2,
            delay: 0.15
          },
          {
            "--success-stroke": "0px",
            duration: 0.15
          }
        ]
      });
    }
  };

  return (
    <div className="newsletter-wrapper">
      <form className="newslatter-form">
        <button
          onClick={handleClick}
          className={isShowAnimation ? "btn active" : "btn"}
        >
          <span className="default">Subscribe</span>
          <span className="success">
            <svg viewBox="0 0 16 16">
              <polyline points="3.75 9 7 12 13 5"></polyline>
            </svg>
            Done
          </span>
          <svg className="trails" viewBox="0 0 33 64">
            <path d="M26,4 C28,13.3333333 29,22.6666667 29,32 C29,41.3333333 28,50.6666667 26,60"></path>
            <path d="M6,4 C8,13.3333333 9,22.6666667 9,32 C9,41.3333333 8,50.6666667 6,60"></path>
          </svg>
          <div className="plane">
            <div className="left"></div>
            <div className="right"></div>
          </div>
        </button>
      </form>
    </div>
  );
};

export default GsapBtn;
