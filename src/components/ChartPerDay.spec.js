/* globals document */
/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import ShallowRenderer from 'react-test-renderer/shallow'; // ES6
import sinon from 'sinon';
import ChartPerDay from './ChartPerDay';

const renderer = new ShallowRenderer();

describe('ChartPerDay', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    const props = {
      perDay: [],
      onDragZoom: sinon.spy(),
    };

    const element = renderer.render(<ChartPerDay {...props} />, div);
    expect(element.props).to.deep.equal({
      height: 500,
      width: 500,
    });
  });
});
