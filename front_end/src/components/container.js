import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';

// Components
import Login from './login';
import SearchPage from './search-page';
import Dashboard from './dashboard/dashboard';
import AddVenue from './dashboard/add-venue';

class Container extends React.Component {
  render() {
    return (
      <div className="container">

        <Switch>
          <Route exact path="/" component={Login} />
          {/* <Route path="/register" component={Register} /> */}
          <Route path="/dashboard" component={Dashboard} />
          {/* <Route path="/searchpage" component={SearchPage} /> */}
        </Switch>

      </div>
    )
  }
}

export default Container;
