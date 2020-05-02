import React, { Suspense } from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Home } from './components/home/home';
import TicketDetail from './components/ticket/ticket-detail';

const EditProfile = React.lazy(() =>
  import('./components/user-profile/edit-profile')
);

const CreateTicket = React.lazy(() =>
  import('./components/ticket/create-ticket')
);

export function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/create-ticket'>New Ticket</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path='/' exact={true}>
            <Home />
          </Route>
          <Route path='/edit-profile'>
            <Suspense fallback={<div>Loading...</div>}>
              <EditProfile />
            </Suspense>
          </Route>

          <Route path='/create-ticket'>
            <Suspense fallback={<div>Loading...</div>}>
              <CreateTicket />
            </Suspense>
          </Route>

          <Route path='/ticket-detail/:id' render={(props) => <TicketDetail {...props} />} />

        </Switch>
      </div>
    </Router>
  );
}

export default App;
