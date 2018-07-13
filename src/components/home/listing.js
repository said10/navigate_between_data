import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dynamic from '../../base/dynamic';
import * as actions from "../../actions";
import PopupSource from "./popup";

class Listing extends Dynamic {
    constructor(props){
        super (props);
    }
    
    componentDidUpdate(prevProps) {
        if (this.props.sources.length > prevProps.sources.length) {
            var composants = dom.getAll(".component");
            var self = this;
            composants.runPlugin("dragDropComponents", {
                parent : "#listing-component", 
                class_counter : "",  
                sortable : "#container-graph.empty",
                type_drag : "normal",
                changeSortable : function(parent, params,evt) {},
                afterUp : function(type) {},
                upAction : function(type) {

                },
                afterDown : function(){

                },
                afterAdded : function(clone) {     
                    //dom.get("#container-graph").removeClass("empty");
                    dom.get("#container-graph").find("#empty-graph").hide();
                    dom.get("#container-graph").find("#graph").show();
                    
                    var object_clone = {
                        name : clone.data("name"),
                        url : clone.data("url"),
                        y_attribute : clone.data("y"),
                        x_attribute : clone.data("x"),
                    };
                    
                    self.props.dragComponent(object_clone);

                }
            });
        }
        
    }
    
    popupComp() {
      if (this.props.open) {
            return <PopupSource />;
        }
      }
    
    
    
    render() {
        let class_last = "";
        const listItems = this.props.sources.map((source, index) => 
            <div className="col-5 {class_last}"  key={source.name.toString()}>
               <div className="component box15 essentiel-shadow white pointer hover animate" data-name={source.name} data-url={source.url} data-x={source.x_attribute} data-y={source.y_attribute}>
                   {source.name}
               </div>
            </div>
      );
        
        return (
            
            
            <div className="bg box30">
                <div className="container">
                    <div className="row gather-15" id="listing-component">
                        {listItems}
                        <div className="clr"></div>
                    </div>
                    
                    <div className="box30 bottom30 align-center">
                       <a href="#" className="btn rose rose-shadow" onClick={ ()=> this.props.openPopup(true) }>Add New Source of data</a>
                   </div>
                </div>

                <div>
                    {this.popupComp()}
                </div>
            </div>
        );
    }
}

function mapStateToPropsListing (state) {
  return  { sources : state.sources, open : state.open, drag : state.drag};
}
export default connect(mapStateToPropsListing, actions)(Listing);