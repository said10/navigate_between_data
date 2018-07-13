import { renderComponent , expect } from '../test_helper';
import App from '../../src/components/app';
import React from 'react';

describe('App' , () => {
  let component;

  beforeEach(() => {
    component = renderComponent(App);
    component_table_list = renderComponent(TableList);
  });

  it('test app exist', () => {
    expect(component).to.exist;
  });
    
});
