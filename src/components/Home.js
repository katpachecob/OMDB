import React, { useState } from "react";
import { useTrail, animated as a } from "react-spring";
import "../index.css";
import { BiMoviePlay } from "react-icons/bi";

const items = ["OMDB", "OMDB", "OMDB", "OMDB", "OMDB"];
const config = { mass: 5, tension: 2000, friction: 200 };

const Home = () => {
  const [toggle, set] = useState(true);
  const trail = useTrail(items.length, {
    config,
    opacity: toggle ? 1 : 0,
    x: toggle ? 0 : 20,
    height: toggle ? 80 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  });

  return (
    <div className="trails-main" onClick={() => set((state) => !state)}>
      <div>
        {trail.map(({ x, height, ...rest }, index) => (
          
          <a.div
            key={items[index]}
            className="trails-text"
            style={{
              ...rest,
              transform: x.interpolate((x) => `translate3d(0,${x}px,0)`),
            }}
          >
            <a.div style={{ height }}><BiMoviePlay/> {items[index]} <BiMoviePlay/></a.div>
          </a.div>
        ))}
      </div>
    </div>

  );
};

export default Home;
