/* @refresh reload */
import { render } from 'solid-js/web';
import 'solid-devtools';

import Home from './frontend/Home';
import Login from './frontend/Login';
import SignUp from './frontend/SignUp';
import Create from './frontend/Create';
import { Route, Router } from '@solidjs/router';

const root = document.getElementById('root');
const body = <Router>
  <Route path={"/"} component={Home} />
  <Route path={"/Login"} component={Login} />
  <Route path={"/SignUp"} component={SignUp} />  
  <Route path={"/Create"} component={Create} />

  {/* nanti ini bisa di remove */}
  <Route path={"/Calendar"} component={Home} />
</Router>

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(() => body, root);
