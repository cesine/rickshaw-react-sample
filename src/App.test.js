/* globals document */
/* eslint-env mocha */
import { expect } from 'chai';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow'; // ES6
import App from './App';

const renderer = new ShallowRenderer();

describe('App', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    const element = renderer.render(<App />, div);
    expect(element.props).to.have.property('store');
    expect(element.props).to.have.property('children');
  });
});
