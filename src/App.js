import React, { useRef, useEffect } from "react";
import p5 from "p5";
import sketch from './sketch';
import "./App.css";

export default function App() {

  const sketchDomElement = useRef();

  useEffect(() => {
    let newp5 = new p5(sketch, sketchDomElement.current);
    return () => {
      newp5.remove();
    };
  }, []);

  return (
    <div className="App">
      <main>
        <section>
          <div ref={sketchDomElement}>
          </div>
        </section>
      </main>
    </div>
  )
}


