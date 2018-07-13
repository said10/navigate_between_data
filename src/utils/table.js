import React, { Component } from 'react';
import Request from '../base/request';



export default class Table extends Request {
    
    
    getHeader() {
        const th_html = this.props.labels.map((label, index) =>
            <th key={label.toString()}>{label}</th>                
        );
        return (
            th_html
        );
        
    }
    createColumn(column) {
        const column_html = column.map((col, index) =>
            <td key={index}>{col}</td>                
        );
        return (
            column_html
        );
    }
    
    getClassZebra(index) {
        if ((index+1)%2 === 0 && index > 0) {
            return "zebra";
        }
    }

    createRows() {
        let class_zebra = "";
        const row_html = this.props.data.map((row, index) =>
            <tr key={index} className={this.getClassZebra(index)}>
                {this.createColumn(row)}
            </tr>                
        );
        return (
            row_html
        );
    }
    
    render() {
        return (
            <div className="table-container container top30 bottom30">
                <table width="100%" cellSpacing="0" cellPadding="0" border="0">
                    <thead>
                        <tr className="header-table shadow">
                            {this.getHeader()}
                        </tr>
                    </thead>
                    <tbody>
                         {this.createRows()}

                    </tbody>


                </table>
            </div>
        );
    }
    
}