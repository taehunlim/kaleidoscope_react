import React from 'react';
import { Global, css } from '@emotion/react';
import theme from "./theme";

const styles = css`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  html,
  body {
    height: 100%;
    margin: 0;
    position: relative;
    background-color: ${theme.bgColor.lightMode};
    transition: background-color 0.3s ease;
    a,
    label {
      text-decoration: none;
      color: ${theme.fontColor.lightMode}
    }

    &.dark-mode {
      background-color: ${theme.bgColor.darkMode};
      color: ${theme.fontColor.darkMode};
    }
  }

  p:last-child {
    margin-bottom: 0;
  }

  a,
  button {
    display: inline-block;
    cursor: pointer;
  }

  *:focus {
    outline: none;
  }
  
  a:focus {
    outline: none;
  }
  
  a {
    span {
      pointer-events: none;
    }
  }

  ul {
    margin: 0;
    padding: 0;

    list-style: outside none none;
  }
  
  p {
    font-size: 13px;
    margin-bottom: 1rem;
  }

  input::-ms-clear,
  input::-ms-reveal {
    display: none;
    width: 0;
    height: 0;
  }

  input::-webkit-search-decoration,
  input::-webkit-search-cancel-button,
  input::-webkit-search-results-button,
  input::-webkit-search-results-decoration {
    display: none;
  }
  
  input:focus::-webkit-input-placeholder,
  textarea:focus::-webkit-input-placeholder {
    color: transparent !important;
  }

  input:focus:-moz-placeholder,
  textarea:focus:-moz-placeholder {
    color: transparent !important;
  } /* FF 4-18 */

  input:focus::-moz-placeholder,
  textarea:focus::-moz-placeholder {
    color: transparent !important;
  } /* FF 19+ */

  input:focus:-ms-input-placeholder,
  textarea:focus:-ms-input-placeholder {
    color: transparent !important;
  } /* IE 10+ */

`;

const GlobalStyles: React.FC = () => {
    return (
        <Global styles={styles}/>
    );
};

export default GlobalStyles;