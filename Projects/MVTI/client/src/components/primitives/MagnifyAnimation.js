import React, { useState, useRef, useEffect } from 'react';
import { animated, useSpring } from 'react-spring';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import MagnifyAnimationStyle from '../../styles/primitives/MagnifyAnimationStyle';

const calc = (x, y, size) => [-(y - size.height / 2) / 20, (x - size.width / 2) / 20, 1.1];
const trans = (x, y, s) => `perspective(2400px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

const MagnifyAnimation = ({ renderOpts = {}, children }) => {
  const { animation = {} } = renderOpts;
  const [props, set] = useSpring(() => {
    const { mass, tension, friction } = animation.config || {};
    return {
      xys: [0, 0, 1],
      config: { mass: mass || 5, tension: tension || 350, friction: friction || 40 },
    };
  });
  const { xys } = props;
  const [size, setSize] = useState({ width: 0, height: 0 });
  const ref = useRef();
  useEffect(() => {
    setSize({
      width: ref.current ? ref.current.offsetWidth : 0,
      height: ref.current ? ref.current.offsetHeight : 0,
    });
  }, [ref.current]);

  return (
    <animated.div
      className="magnify-animation"
      onMouseMove={({ nativeEvent }) => {
        const { x, y } = { x: nativeEvent.offsetX, y: nativeEvent.offsetY };
        set({ xys: calc(x, y, size), config: animation.config });
      }}
      onMouseLeave={() => set({ xys: [0, 0, 1], config: animation.config })}
      style={{ transform: xys.interpolate(trans) }}
      ref={ref}
      css={MagnifyAnimationStyle}
    >
      {children}
    </animated.div>
  );
};

export default React.memo(MagnifyAnimation);
