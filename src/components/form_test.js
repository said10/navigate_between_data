import React, { Component } from 'react';
import Form from "../utils/form";

export default class TestForm extends Form {
    
    getButtons() {
        return (
            <div className="box30 align-center top30">
               <input type="button" value="Save" className="rose rose-shadow" onClick={this.submit.bind(this)} />
           </div>
        );
    }
    
    afterValidate(serialization) {
        console.log(serialization);
    }
    
    
}