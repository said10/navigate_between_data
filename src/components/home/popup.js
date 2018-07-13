import React, { Component } from 'react';
import Popup from "../../utils/popup";
import FormPopup from "./form_popup";

export default class PopupSource extends Popup {
    
    popupContent() {
        const inputs = [
            { type : "text", label : "Name of Source", name: "name", required : true, rule : "string", placeholder : "USA statistcs for 2000" },
            { type : "text", label : "URL of Source",  name: "url", required : true, rule : "string", placeholder : "http://exemple.com/data.json" },
            { type : "text", label : "Name of X Axis Attribute Value",  name: "x_attribute", required : true, rule : "string", placeholder : "category" },
            { type : "text", label : "Name of Y Axis Attribute Value",  name: "y_attribute", required : true, rule : "string", placeholder : "AvrRating" },
        ];
        
        return (
            <FormPopup title="Add new Source" inputs={inputs} />
        );
    }
   
}


