import React, { useRef, useEffect } from "react";
import p5 from "p5";
// import sketch from './sketch';
// import followMouse from './followMouse';
import colorSwarm from './colorSwarm';
import styled from 'styled-components';
import "./App.css";


export default function App() {
  // const sketchFollowMouse = useRef();
  // const sketchDomElement = useRef();
  const sketchColorSwarm = useRef();

  const CanvasWrap = styled.div`
    position:relative;
    h1 {
      position:absolute;
      font-size:4rem;
    }
  `

  // useEffect(() => {
  //   let newp5 = new p5(followMouse, sketchFollowMouse.current);
  //   return () => {
  //     newp5.remove();
  //   };
  // }, []);

  // useEffect(() => {
  //     let newp5 = new p5(sketch, sketchDomElement.current);
  //   return () => {
  //     newp5.remove();
  //   };
  // }, []);

  useEffect(() => {
    let newp5 = new p5(colorSwarm, sketchColorSwarm.current);
    return () => {
      newp5.remove();
    };
  }, []);

  return (
    <div className="App">
      <main>
        <section>
          {/* <div className="follow-mouse" ref={sketchFollowMouse}>
          </div> */}
          <CanvasWrap>
            <div className="color-swarm" ref={sketchColorSwarm} style={{
              display: "flex",
              justifyContent: "center",
            }}>
              <h1>Seth Anderson</h1>
            </div>
          </CanvasWrap>
          {/* <div className="sketch" ref={sketchDomElement}>
          </div> */}
        </section>
      </main>
    </div >
  )
}


