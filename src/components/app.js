import React, { Component } from 'react';
import { connect } from 'react-redux';
import Page from "../base/page";
import ViewHome from "./home/view_home";

export default class App extends Component {  

  
  render() {
    const title = "Navigate between Your Data easily"
    return (
        <div>
            <Page path="/" title={title}>
                <ViewHome title={title} />
            </Page>
        </div>
    );
  }
}
/*
function mapStateToProps (state) {
  return  { open : state.open};
}
export default connect(mapStateToProps, actions)(App);*/