import { ComponentSelector, css } from "@emotion/react";

import { unfoldIn, unfoldOut, zoomIn, zoomOut } from "./unfolding";

export const unfoldingStyle = (Content: ComponentSelector) => css`
  &.show {
    animation: ${unfoldIn} 1s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;

    ${Content} {
      /* 초기 display: none 처럼 크기를 0 으로 하여 보여주지 않음*/
      transform: scale(0);
      /* 0.5 초 동안 애니메이션을 실행, 단 0.8초 지연시켜 0.8초 후에 애니메이션을 실행 */
      animation: ${zoomIn} 0.5s 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
    }
  }

  &.hidden {
    transform: scale(1);
    animation: ${unfoldOut} 1s 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;

    ${Content} {
      animation: ${zoomOut} 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
    }
  }
`;
