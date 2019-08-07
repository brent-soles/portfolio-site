/** @jsx jsx */ import { jsx } from '@emotion/core'

import * as React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import { useSpring, animated } from 'react-spring';
import { css } from '@emotion/core';

const cardStyles = css`
  align-items: flex-start;
  border-radius: 8px;
  box-sizing: border-box;
  color: mediumaquamarine;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 20px;
  padding: 20px;
  width: 300px;

  &--light {
    background: #fefefe;
  }

  &--dark {
    background: #000;
  }

  h1 {
    margin: 10px 0px;
  }

  h1::after {
    display: block;
    content: "";
    background: mediumaquamarine;
    height: 2px;
    margin-top: 10px;
    width: 20px;
  }

  p {
    margin: 20px 0px;
  }
`;

const modCls = (clsName) => {
  return (...modifiers) => {
    return clsName + ' ' + modifiers.map(el => clsName + el).join(' ')
  }
} 

const App = () => {
  const [ move, setMove ] = useState(false);
  const cardProps = useSpring({
    boxShadow: move ? 
     `0px 8px 20px rgba(0, 0, 0, .2)` : 
     `0px 0px 0px rgba(0, 0, 0, .2)`,
    transform: move ?
      `translateX(50px) translateY(0px)` : 
      `translateX(0px) translateY(0px)`
  });

  const pProps = useSpring({
    boxShadow: move ? 
     `0px 8px 20px rgba(0, 0, 0, .2)` : 
     `0px 0px 0px rgba(0, 0, 0, .2)`,
    transform: move ?
      `translateX(0px) translateY(50px)` : 
      `translateX(0px) translateY(0px)`
  });

  return (
    <animated.div 
      className={modCls('post__preview')('--dark')}
      css={...cardStyles}
      onMouseEnter={() => setMove(true)}
      onMouseLeave={() => setMove(false)}
    >
      <animated.h1
        style={cardProps}
      >
       Goodbye!
      </animated.h1>
    
      <animated.p
        style={pProps}
      >
        This is a dark card
      </animated.p>
    </animated.div>
  )
}

/*
  const App = () => {
    return <div className="o-container">
      <div 
        className="o-card o-card--light"
        draggable
      >
        <h1>Hello!</h1>
        <p>This is a light card</p>
      </div>
      <div 
        className="o-card o-card--dark"
        draggable
        onMouseUp={(e) => {
          console.log(e.target);
          e.target.style.transform = `translate(${e.target.clientX}, ${e.target.clientY})`
        }}
        onDragEnd={(e) => {
          // console.log(e.target.clientX);
          e.target.style.transform = `translate(${e.target.clientX}, ${e.target.clientY})`
        }}
      >
        <h1>Goodbye!</h1>
        <p>This is a dark card</p>
      </div>
    </div>
  }
*/
ReactDOM.render(<App />, document.getElementById('app'));
