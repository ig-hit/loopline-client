import { combineEpics } from 'redux-observable';

import * as notebooks from '../features/notebooks/epics';

export default combineEpics(...Object.values(notebooks));
