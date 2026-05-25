/* @refresh reload */
import { render } from 'solid-js/web';
import 'solid-devtools';

import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import { Route, Router } from '@solidjs/router';

const root = document.getElementById('root');
const body = <Router>
  <Route path={"/"} component={Home} />
  <Route path={"/Login"} component={Login} />
  <Route path={"/SignUp"} component={SignUp} />  
</Router>

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(() => body, root);
