import { keyframes } from "@emotion/react";

/* Dimmed showing */
export const unfoldIn = keyframes`
  0% {
    transform: scaleX(0) scaleY(0.005);
  }
  50% {
    /* 0.5 초간 세로 크기는 작은상태로 가로 너비만 확대 */
    transform: scaleX(1) scaleY(0.005);
  }
  100% {
    /* 0.5 초간 세로 크기를 확대 */
    transform: scaleY(1) scaleX(1);
  }
`;

/* Show modal content */
export const zoomIn = keyframes`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
`;

/* Hide modal content */
export const zoomOut = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0);
  }
`;

/* Dimmed hiding */
export const unfoldOut = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scaleX(1) scaleY(0.005);
  }
  100% {
    transform: scaleX(0) scaleY(0.005);
  }
`;
