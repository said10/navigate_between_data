import React, { Component } from 'react';
//import { connect } from 'react-redux';
import View from "../../base/view";
import Header from "./header";
import Listing from "./listing";
import Graph from "./graph";

//import * as actions from "../../actions";


export default class ViewHome extends View {  

    
 
  
  render() {
    return (
        <div>
            <Header title={this.props.title} />
            <Listing />
            <Graph title="" />
        </div>
    );
  }
}

