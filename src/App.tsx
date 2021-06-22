import { BrowserRouter, Route } from 'react-router-dom';
import { Home, NewRoom } from './pages';

import { AuthContextProvider } from './contexts';

const routes = [
  { path: '/', component: Home, exact: true },
  { path: '/rooms/new', component: NewRoom },
];

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        {routes.map(props => <Route key={props.path} {...props} />)}
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
