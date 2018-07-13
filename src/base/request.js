import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dynamic from './dynamic';
import axios from 'axios';

export default class Request extends Dynamic {
    constructor(props){
        super (props);
    }
    
     // Add some features for Request Component to reuse the code
    
    get(url, callback, error_callback) {
        var self = this;
        axios.get(url).then(function(response) {
            
            if (typeof callback !== null && typeof callback === "function" ) {
                callback.call(self, response);
            }
        }, function(error) {
            if (typeof error_callback !== null && typeof error_callback === "function" ) {
                error_callback.call(self, error.response);
            }
        })
    }
    post (url, data) {
        var self = this;
        axios.post(url, data).then(function(response) {
            if (typeof callback !== null && typeof callback === "function" ) {
                callback.call(self, response);
            }
        });
    }
    
    render() {
        
    }
}

