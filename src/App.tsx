import { useRoutes } from 'react-router-dom';
import { routes } from './routes/routes';

const App = () => {
   return useRoutes(routes);
};

export default App;