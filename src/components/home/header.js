import React, { Component } from 'react';
import Static from '../../base/static';

export default class Header extends Static {  

  
  render() { 
    return (
        <div>
            <div className="shadow background box20 align-center white-color">
                <h1>{this.props.title}</h1>
            </div>
            <div className="essentiel-shadow box20 align-center relative">
                <h2>Sources of datas</h2>
            </div>
        </div>
    );
  }
}

