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
      height: 60,
      width: 100,
      perDay: [],
      onDragZoom: sinon.spy(),
    };

    const el = renderer.render(<ChartPerDay {...props} />, div);
    expect(el.props.children[1].props).to.deep.equal({
      height: 60,
      width: 100,
    });
  });

  it('should have a defaults', () => {
    const div = document.createElement('div');
    const props = {
      perDay: [],
      onDragZoom: sinon.spy(),
    };

    const el = renderer.render(<ChartPerDay {...props} />, div);
    expect(el.props.children[0].props).to.deep.equal({
      children: 'Chart',
    });
    expect(el.props.children[1].props).to.deep.equal({
      height: 0,
      width: 0,
    });
  });

  it('should support a title', () => {
    const div = document.createElement('div');
    const props = {
      title: 'Today',
      perDay: [],
      onDragZoom: sinon.spy(),
    };

    const el = renderer.render(<ChartPerDay {...props} />, div);
    expect(el.props.children[0].props).to.deep.equal({
      children: 'Today',
    });
    expect(el.props.children[1].props).to.deep.equal({
      height: 0,
      width: 0,
    });
  });
});
