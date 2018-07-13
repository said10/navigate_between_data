import React, { Component } from 'react';
import Request from '../base/request';

export default class Popup extends Request {
    
    getTitle() {
        if (this.props.title !== "" && typeof this.props.title !== "undefined") {
            return (
                <h2 className="bottom20">{this.props.title}</h2>
            )
        }
    }
    
    popupContent() {
        
    }
    
    render() {
        return (
            <div className="overlay block">
                <div className="popup relative col-3 center-auto white essentiel-shadow">
                    {this.getTitle()}
                    {this.popupContent()}
                </div>

            </div>
        );
    
    }
    
}