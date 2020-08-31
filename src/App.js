import React, { useRef, useEffect } from "react";
import p5 from "p5";
// import sketch from './sketch';
import followMouse from './followMouse';
import "./App.css";


export default function App() {
  const sketchFollowMouse = useRef();
  // const sketchDomElement = useRef();

  useEffect(() => {
    let newp5 = new p5(followMouse, sketchFollowMouse.current);
    return () => {
      newp5.remove();
    };
  }, []);

  // useEffect(() => {
  //     let newp5 = new p5(sketch, sketchDomElement.current);
  //   return () => {
  //     newp5.remove();
  //   };
  // }, []);

  return (
    <div className="App">
      <main>
        <section>
        <div className="follow-mouse" ref={sketchFollowMouse}>
          </div>
          {/* <div className="color-swarm" ref={sketchColorSwarm}>
          </div> */}
          {/* <div className="sketch" ref={sketchDomElement}>
          </div> */}
        </section>
      </main>
    </div>
  )
}
