import jquery from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import {JSDOM} from 'jsdom';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../src/reducers';
import domChai from "../libs/dom-chai";



global.domjs = new JSDOM('<!doctype html><html><body></body></html>');
global.window = domjs.window;
global.document = domjs.window.document;
global.navigator = global.window.navigator;
const $ = jquery(global.window);
domChai(global.window, global.document, global.window.Element, global.window.NodeList);


function renderComponent(ComponentClass, props = {}, state = {}) {
  const componentInstance =  TestUtils.renderIntoDocument(
    <Provider store={createStore(reducers, state)}>
      <ComponentClass {...props} />
    </Provider>
  );

  return $(ReactDOM.findDOMNode(componentInstance));
}

$.fn.simulate = function(eventName, value) {
  if (value) {
    this.val(value);
  }
  TestUtils.Simulate[eventName](this[0]);
};


chaiJquery(chai, chai.util, $);

export {renderComponent, expect};
