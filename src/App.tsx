import React, { Component } from 'react';
import {Provider} from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route, Redirect } from 'react-router';

import store, { history } from './store';
import { getPath } from './router-paths';
import AddArticle from './routes/AddArticle';
import EditArticle from './routes/EditArticle';
import ViewArticle from './routes/ViewArticle';
import Register from "./routes/Register";
import Home from "./routes/Home";

class App extends Component<{}> {
  render() {
    const token = store.getState().notebooks.user.token;

    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          {token &&
          <Switch>
              <Route exact path={getPath('home')} render={props => <Home {...props} />} />
              <Route exact path={getPath('register')} render={() => <Redirect to="/"/>} />
              <Route exact path={getPath('addArticle')} render={AddArticle} />
              <Route
                  exact
                  path={getPath('editArticle', ':articleId')}
                  render={props => <EditArticle {...props} />}
              />
              <Route
                  exact
                  path={getPath('viewArticle', ':articleId')}
                  render={props => <ViewArticle {...props} />}
              />
              <Route render={() => <div>Page not found!</div>} />
          </Switch>
          }

          {!token &&
            <Switch>
              <Route exact path={getPath('register')} render={(props) => <Register {...props}/>} />
              <Route render={() => <Redirect to="/register"/>} />
            </Switch>
          }

        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
