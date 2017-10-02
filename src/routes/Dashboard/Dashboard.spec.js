/* globals document */
/* eslint-env mocha */
import { expect } from 'chai';
import sinon from 'sinon';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow'; // ES6
import Dashboard from './View';

const renderer = new ShallowRenderer();

describe('Dashboard', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    const props = {
      history: {},
      deploysByHour: [],
      deploysPerDay: [],
      deploysByDayOfTheWeek: [],
      deploysPerWeek: [],
      deploysPerDayHistogram: [],
      onDragZoom: sinon.spy(),
    };

    const element = renderer.render(<Dashboard {...props} />, div);
    expect(element.props).to.not.have.property('store');
  });
});
