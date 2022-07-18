import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App';

import {ThemeProvider} from '@emotion/react';
import GlobalStyles from "./assets/styles/GlobalStyles";
import theme from "./assets/styles/theme";


const container = document.getElementById('root');
const root = ReactDOM.createRoot(container as Element);
root.render(
    <ThemeProvider theme={theme}>
        <GlobalStyles/>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </ThemeProvider>
    ,
);