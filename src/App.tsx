import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home, NewRoom, Room } from './pages';

import { AuthContextProvider } from './contexts';

const routes = [
  { path: '/', component: Home, exact: true },
  { path: '/rooms/new', component: NewRoom },
  { path: '/rooms/:id', component: Room  },
];

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          {routes.map(props => <Route key={props.path} {...props} />)}
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
