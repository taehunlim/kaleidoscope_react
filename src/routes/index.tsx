import { lazy } from 'react';

const setLazyImport = (path: string) => {
   return lazy(() => import(/* webpackChunkName: "[request]" */ `../pages/${path}`));
};

export const Home = setLazyImport("Home");