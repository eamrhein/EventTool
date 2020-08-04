import { Button } from "grommet";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
 0% {
        -webkit-transform: scaleX(1);
        transform: scaleX(1);
    }
    50% {
        -webkit-transform: scale3d(1.05, 1.05, 1.05);
        transform: scale3d(1.05, 1.05, 1.05);
    }
    to {
        -webkit-transform: scaleX(1);
        transform: scaleX(1);
    }


`;

export const StyledSectionButton = styled(Button)`
  color: ${(props) => (props.open ? "#3659e3" : null)};
  &:hover {
    animation: ${rotate} ease-in-out;
    animation-duration: 0.4s;
    animation-fill-mode: both;
    animation-iteration-count: 1;
  }
`;
