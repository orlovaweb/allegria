import { gsap } from "gsap";
import React, { useRef } from "react";
import "./gsapEx.scss";

const GsapEx = () => {
  // const [clicked, setClicked] = useState(false);
  const ref = useRef(null);
  const inputRef = useRef();

  const handleClick = (e) => {
    e.preventDefault();
    console.log(inputRef.current.value);
    gsap.to(".gsapBtn", {
      keyframes: [
        {
          "--left-wing-first-x": "50%",
          "--left-wing-first-y": "100%",
          "--right-wing-second-x": "50%",
          "--right-wing-second-y": "100%",

          duration: 0.2,
          onComplete() {
            gsap.set(".gsapBtn", {
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
              ref.current.children[0].removeAttribute("style");
              gsap.fromTo(
                ".gsapBtn",
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
                    // button.classList.remove("active");
                  }
                }
              );
            }, 2500);
          }
        }
      ]
    });
    gsap.to(".gsapBtn", {
      keyframes: [
        {
          "--text-opacity": 0,
          "--border-radius": "0px",
          "--bg": "#fff",
          "--left-wing-background": "#0F303F",
          "--right-wing-background": "#0F303F",
          duration: 0.1
        },
        {
          "--left-wing-background": "#0F303F",
          "--right-wing-background": "#0F303F",
          duration: 0.15
        },
        {
          "--left-body-background": "#0F303F",
          "--right-body-background": "#081c25",
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
  };

  return (
    <>
      <div className="box-wrap" ref={ref}>
        <form className="footer__form">
          <input type="email" placeholder="E-mail" ref={inputRef} />
          <button onClick={handleClick} className="gsapBtn active">
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
    </>
  );
};

export default GsapEx;
