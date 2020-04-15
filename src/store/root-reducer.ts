import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import articles from '../features/articles/reducer';
import notebooks from '../features/notebooks/reducer';

const rootReducer = (history: History<any>) =>
  combineReducers({
    router: connectRouter(history),
    articles,
    notebooks,
  });

export default rootReducer;
