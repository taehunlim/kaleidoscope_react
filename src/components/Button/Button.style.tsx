import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { ThemeProps, BootstrapColorProps } from 'assets/styles/emotion';

interface StyleProps extends React.ComponentProps<'button'> {
   height?: number;
}

type BootstrapColorKeys = keyof BootstrapColorProps;

const colorList = ['primary', 'danger', 'complete', 'onGoing', 'etc'];

const styles = ({
   height,
   disabled,
   theme,
   ...props
}: StyleProps & ThemeProps) => {
   const selectedColor = colorList.find(
      (color: BootstrapColorKeys) => color in props && color,
   ) as BootstrapColorKeys;

   const selectedBgColor = selectedColor
      ? theme.bg[selectedColor]
      : 'transparent';
   const bg = disabled ? '#d2d3d5' : selectedBgColor;

   const selectedFontColor = selectedColor
      ? theme.fg[selectedColor]
      : theme.fg.black;
   const fontColor = disabled ? theme.fg.white : selectedFontColor;

   return css`
      display: inline-flex;
      align-items: center;
      white-space: nowrap;
      font-size: ${height && `${height / 40}rem`};
      height: 2.5em;
      justify-content: center;
      text-decoration: none;
      cursor: ${disabled ? 'default' : 'cursor'};
      appearance: none;
      padding: 0 1em;
      pointer-events: ${disabled ? 'none' : 'auto'};
      border-radius: 0.25em;
      border: 0.0625em solid ${!selectedColor ? '#d2d3d5' : 'transparent'};
      transition: background-color 250ms ease-out, color 250ms ease-out,
         border-color 250ms ease-out;
      background-color: ${bg};
      color: ${fontColor};

      &:hover,
      &:focus,
      &:active {
         background-color: ${selectedColor
            ? theme.fg[selectedColor]
            : 'transparent'};
         color: ${selectedColor ? theme.fg.white : theme.fg.primary};
         border: 0.0625em solid
            ${selectedColor ? 'currentcolor' : theme.fg.primary};
      }

      svg {
         appearance: none;
      }
   `;
};

const StyledButton = styled.button<StyleProps>`
   ${styles}
`;

const styledComponent = { StyledButton };
export default styledComponent;
