import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from "../../utils/form";
import * as actions from "../../actions";

class FormPopup extends Form {
    
    getButtons() {
        return (
            <div className="box30 align-center top30">
               <input type="button" value="Cancel" className="gris shadow" onClick={ ()=> this.props.openPopup(false) } />
               <input type="button" value="Save" className="rose rose-shadow" onClick={this.submit.bind(this)} />
           </div>
        );
    }
    
    afterValidate(serialization) {
        var self = this;
        self.props.addSource([serialization]);
        self.props.openPopup(false);
    }
    
    
}

function mapStateToPropsPopup (state) {
  return  { sources : state.sources, open : state.open};
}
export default connect(mapStateToPropsPopup, actions)(FormPopup);