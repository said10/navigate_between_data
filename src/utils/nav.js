import React, { Component } from 'react';
import { Link } from 'react-router-dom'


export default class Navigation extends Component{
    
    
    createLinks() {
        const naviation_html = this.props.links.map((link, index) =>
            <li key={link.text.toString()}>
                <Link to={link.link} className="color">{link.text}</Link>
            </li>
        );
        return (
            naviation_html
        );
    }
    
    componentDidMount() {
        this.activeLinks();
    }
    
    activeLinks() {
        var url_document = location.pathname;
        var link_target = dom.get("a[href='"+url_document+"']");
        if (link_target !== null) {
            link_target.addClass("active");
        }
    }
    
    render() {
        return (
            <div className="navigation white">
                <ul className="horizontal">
                    {this.createLinks()}
                </ul>
                <div className="clr"></div>
            </div>
            
        );
    }
} 