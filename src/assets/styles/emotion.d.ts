import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    deviceSize: {
      desktop: string,
      laptop: string,
      tablet: string,
      mobile: string
    },

    primary: {
      bg: string,
      font: string,
    },

    bgColor: {
      lightMode: string,
      darkMode: string
    },
  
    fontColor: {
      lightMode: string,
      darkMode: string
    };
    color: {
      primary: string,
      danger: string,
      white: string,
      black: string,
      black_bold: string,
      gray: string,
      gray_two: string,
    }
  }
}