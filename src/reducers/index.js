import { combineReducers } from 'redux';
import timestampsToDatePeriods from '../lib/timestampsToDatePeriods';

console.log('timestampsToDatePeriods', timestampsToDatePeriods);

const rootReducer = combineReducers({
  dummy: (s = []) => s,
});

export default rootReducer;
