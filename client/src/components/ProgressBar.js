import React from "react";
import { Text, Box } from "grommet";
import styled, { css, keyframes } from "styled-components";

const move = keyframes`
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 50px 50px;
  }
`;
const expand = keyframes`
    0% { width: 0; }
    to
   100% { width: auto; }
`;
const BarFrame = styled.div`
  height: 15px;
  width: ${(props) => props.width};
  position: relative;
  background: #555;
  -moz-border-radius: 25px;
  -webkit-border-radius: 25px;
  border-radius: 25px;
  padding: 5px;
  box-shadow: inset 0 -1px 1px rgba(255, 255, 255, 0.3);
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    height: 100%;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    background-color: ${(props) => {
      if (props.red) {
        return "#f0a3a3";
      }
      if (props.orange) {
        return "#f1a165";
      }
      return "rgb(43, 194, 83)";
    }};

    background-image: ${(props) => {
      if (props.red) {
        return "linear-gradient(to bottom, #f0a3a3, #f42323)";
      }
      if (props.orange) {
        return "linear-gradient(to bottom, #f1a165, #f36d0a)";
      }
      return "linear-gradient(center bottom,rgb(43, 194, 83) 37%, rgb(84, 240, 84) 69%)";
    }};
    box-shadow: inset 0 2px 9px rgba(255, 255, 255, 0.3),
      inset 0 -2px 6px rgba(0, 0, 0, 0.4);
    position: relative;
    text-shadow: 2px 2px #ff0000
    overflow: hidden;
    animation: ${expand} 2s linear;
  }
  span:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-image: linear-gradient(
      -45deg,
      rgba(255, 255, 255, 0.2) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.2) 75%,
      transparent 75%,
      transparent
    );
    z-index: 1;
    background-size: 50px 50px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    overflow: hidden;
    animation: ${(props) =>
      props.animate
        ? css`
            ${move} 2s linear infinite
          `
        : null}
  }
`;

let statusHash = {
  1: "10%",
  2: "20%",
  3: "30%",
  4: "40%",
  5: "50%",
  6: "60%",
  7: "70%",
  8: "80%",
  9: "90%",
  10: "100",
};
const ProgressBar = ({ status }) => {
  let progress = statusHash[status];

  return (
    <>
      <BarFrame
        animate
        width="200px"
        red={status < 5}
        green={status === 10}
        orange={status > 4 && status < 10}
      >
        <span style={{ width: `${progress}` }}>
          <span></span>
        </span>
      </BarFrame>
      <Box align="center">
        {status < 10 ? (
          <Text color="Orange">Ready to Publish</Text>
        ) : (
          <Text>Published</Text>
        )}
      </Box>
    </>
  );
};

export default ProgressBar;
