/* @refresh reload */
import { render } from 'solid-js/web';
import 'solid-devtools';

import Home from './Home';
import { Route, Router } from '@solidjs/router';

const root = document.getElementById('root');
const body = <Router>
  <Route path={"/"} component={Home} />
</Router>

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(() => body, root);
