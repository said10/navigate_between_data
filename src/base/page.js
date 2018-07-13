import React, { Component } from 'react';
import {BrowserRouter, Route } from 'react-router-dom';



export default class Page extends Component {
    componentDidMount() {
        document.title = this.props.title;
    }
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Route path={this.props.path}>
                        {this.props.children}
                    </Route>
                </BrowserRouter>
            </div>
        );
    }
}