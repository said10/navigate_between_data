import React, { Component } from 'react';
import Request from '../base/request';

export default class Form extends Request {
    
    
    
    getTitle() {
        if (this.props.title !== "" && typeof this.props.title !== "undefined") {
            return (
                <h1 className="bottom30">{this.props.title}</h1>
            )
        }
    }
    
    afterValidate(serialize_form) {
        
    }
    
    validate(elem, evt) {
        var form = elem.closests("form");
        var self = this;
        form.runPlugin("validator", {
            parent : form,
            valid : function(response) {
                
                if (response) {
                    var serialize_form = form.serialize("object");
                    if (typeof self.afterValidate !== "undefined") {
                        self.afterValidate(serialize_form);
                    }
                    
                }
            },
            error : function() {
                evt.preventDefault();
                return false;
            }
        });
    }
    
    submit(evt) {
        this.validate(evt.target, evt);
    }
    
    processuInputs(list) {
        var l = list.length;
        for (var i = 0; i < l; i++) {
            var input = list[i];
            if ( input.hasOwnProperty("type") === false ) {
                input.type = "text";
            }
            if ( input.hasOwnProperty("required") === false ) {
                input.required = "";
            }
            if ( input.hasOwnProperty("required") === true ) {
                if (input.required === true) {
                    input.required = "required";
                }
                else {
                    input.required = "";
                }
                
            }
            if ( input.hasOwnProperty("rule") === false ) {
                input.rule = "string";
            }
            if ( input.hasOwnProperty("placeholder") === false ) {
                input.placeholder = "Enter a "+input.name;
            }
            if ( input.type === "checkbox" || input.type === "radio" ) {
                input.rule = "boolean";
            }
            list[i] = input;
        }
        
        return list;
    }
    renderOptionsSelect(options) {
        const options_html = options.map((option, index) =>
            <option value={option.value} key={option.label.toString()}>{option.label}</option>                       
        );
        return (
            options_html
        )
    }
    
    getInput(input) {
         switch (input.type) { 
            case "checkbox":
                return (<p className="relative">
                    <input type="checkbox" name={input.name} className={input.required} value={input.value} data-rule={input.rule}  />
                    <label>{input.label}</label>
                </p>);
            break;
            case "radio":
                return (<p className="relative">
                    <input type="radio" name={input.name} className={input.required} value={input.value} data-rule={input.rule} />
                    <label>{input.label}</label>
                </p>);
            break;
            case "textarea":
                return (<p className="relative">
                    <label>{input.label}</label>
                    <textarea name={input.name} placeholder={input.placeholder} className={input.required} data-rule={input.rule} ></textarea>

                </p>);
            break;
            case "select":
                return (<p className="relative">
                    <label>{input.label}</label>
                    <select name={input.name} className={input.required} data-rule={input.rule}>
                        <option value="">{input.placeholder}</option>
                        {this.renderOptionsSelect(input.options)}
                    </select>
                </p>);
            break;
            default : 
                 return (<p className="relative">
                    <label>{input.label}</label>
                    <input type={input.type} name={input.name} placeholder={input.placeholder} className={input.required} data-rule={input.rule} />
                </p>);
            break;
        }
    }
    
    CreateInputs() {
        let list_inputs = this.props.inputs;
        let l_list = list_inputs.length;
        list_inputs = this.processuInputs(list_inputs);
        let html_input = null;
        const inputs_html = list_inputs.map((input, index) =>
             <div className="div-input" key={input.label.toString()}>{this.getInput(input)}</div>
        );
        return inputs_html;
    }


    getButtons() {
        return (
            <div className="box30 align-center top30">
               <input type="button" value="Save" className="background shadow" onClick={this.submit.bind(this)} />
           </div>
        );
    }
    
    render() {
    return (
        <form className="top30 bottom30">
            {this.getTitle()}
            {this.CreateInputs()}
            {this.getButtons()}
        </form>
    );
  }
    
}