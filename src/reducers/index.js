import { combineReducers } from 'redux';
import getTimestampsToDatePeriods from '../lib/timestampsToDatePeriods';

const timestampsToDatePeriods = getTimestampsToDatePeriods();

function debug() {
  // console.log(arguments);
}
const rootReducer = combineReducers({
  startDate: function startDate(state = timestampsToDatePeriods.startDate) {
    debug('startDate', state);
    return state;
  },
  endDate: function endDate(state = timestampsToDatePeriods.endDate) {
    debug('endDate', state);
    return state;
  },
  data: function data(state = timestampsToDatePeriods.data) {
    debug('data', state);
    return state;
  },
  deploysPerDay: function deploysPerDay(state = timestampsToDatePeriods.deploysPerDay) {
    debug('deploysPerDay', state);
    return state;
  },
  deploysPerDayHistogram: function deploysPerDayHistogram(state
    = timestampsToDatePeriods.deploysPerDayHistogram) {
    debug('deploysPerDayHistogram', state);
    return state;
  },
  deploysPerWeek: function deploysPerWeek(state = timestampsToDatePeriods.deploysPerWeek) {
    debug('deploysPerWeek', state);
    return state;
  },
  daysWithoutDeploys: function daysWithoutDeploys(state
    = timestampsToDatePeriods.daysWithoutDeploys) {
    debug('daysWithoutDeploys', state);
    return state;
  },
  deploysByHour: function deploysByHour(state = timestampsToDatePeriods.deploysByHour) {
    debug('deploysByHour', state);
    return state;
  },
  deploysByDayOfTheWeek: function deploysByDayOfTheWeek(state
    = timestampsToDatePeriods.deploysByDayOfTheWeek) {
    debug('deploysByDayOfTheWeek', state);
    return state;
  },
});

export default rootReducer;
