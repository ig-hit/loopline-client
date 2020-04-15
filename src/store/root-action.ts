import { routerActions } from 'connected-react-router';
import * as articlesActions from '../features/articles/actions';
import * as userActions from '../features/notebooks/actions';

export default {
  router: routerActions,
  articles: articlesActions,
  user: userActions,
};
