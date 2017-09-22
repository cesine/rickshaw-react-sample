import { call, takeLatest } from 'redux-saga/effects';

import { REQUEST_DASHBOARD } from './actions';
import { dashboard } from './api';

function* dashboardSaga({ payload: { fields, callback } }) {
  const { isError } = yield call(dashboard, fields);
  if (!isError) {
    callback();
  }
}

export default function* mySaga() {
  yield takeLatest(REQUEST_DASHBOARD, dashboardSaga);
}
