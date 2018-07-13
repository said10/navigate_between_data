dom.addPlugin("validator", function(params) {
	var element = this;
	params = params || {};
    var parent_validator = params.parent || element.closests("form");
    
    var utils_validator = {
        is_boolean : function(value) {
            if (typeof value === "boolean" && this.is_string(value) === false) {
                if (value === true) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        },
        is_string : function(value) {
            if( typeof value === 'string' || value instanceof String  && typeof value !== "boolean" ) {
                return true;
            }
            else {
                return false;
            }
        },
        is_number : function (value) {
            if( !isNaN(value/1) && typeof value !== "boolean" ) {
                return true;
            }
            else {
                return false;
            }
	   },
       is_password : function(value) {
            if( value.length >= 8 ) {
                return true;
            }
            else {
                return false;
            }
	   },
       is_email : function(email) {
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var test = re.test(email);
            if( test ) {
                return true;
            }
            else {
                return false;
            }
	   },
       is_phone : function(telephone) {
            let re = /^((0|\+|00)\d{2,3}\s?\d{3,9}\s\d{3,9})/g;
            var test = re.test(telephone);
            if( test ) {
                return true;
            }
            else {
                return false;
            }
        },
       is_date : function(date) {
            var new_date = new Date(date).getDate();
            if (isNaN(new_date)) {
                return false;
            }
            else {
                return true;
            }
        }
    };
    
    params.createMessage = function(type) {
        var message = "";
        switch(type) {
            case "string" : 
                message = "This field is required";
            break;
            case "number" : 
                message = "Enter valid number";
            break;
            case "phone" : 
                message = "Enter valid phone number";
            break;
            case "email" : 
                message = "Enter valid address email";
            break;
            case "password" : 
                message = "Your password must contain at least 8 characters";
            break;
            case "date" : 
                message = "Enter valid date format YYYY/MM/DD or DD/MM/YYYY";
            break;
            case "string_code" : 
                message = "Enter valid code";
            break;
        }
        return message;
    };
    
    params.isRequired = function(input, message) {
        var value = input.val();
		if( (value.length > 0 && value !== null && typeof value !== "undefined") || input.checked === true) {
			return !this.addErrorInput(input, false);
		}
		else {
			return !this.addErrorInput(input, true, message);
		}
    };
    
    params.addErrorInput = function(input, apply, message) {
        if( apply ) {
			input.addClass("error");
            input.getParent().addClass("error-p");
            var type_input = input.attr("type");
            if (type_input !== "checkbox" && type_input !== "radio") {
                input.after('<span class="message-error-input"><span class="inline-block">'+message+'</span></span>');
            } 
		}
		else {
			input.removeClass("error");
            input.getParent().removeClass("error-p");
            input.getParent().findAll(".message-error-input").remove();
		}
		return apply;
    };
    
    var inupts = parent_validator.findAll(".required");
    var nbr_input = inupts.length;
    var radios_names = {};
		var test_passe = [];
		for( var i = 0; i < nbr_input; i++ ) {
			var input = parent_validator.findAll(".required").eq(i);
            var attr_name_input = input.attr("name");
            if (typeof attr_name_input !== "undefined" &&  attr_name_input !== null && attr_name_input !== "" ) {
                var rule = input.data("rule");
                var value = input.val();
                if (input.attr("type") === "checkbox" || input.attr("type") === "radio") {
                    value = input.checked;
                }
                if (input.attr("type") === "radio") {
                    let name_radio = input.attr("name");
                    if (radios_names.hasOwnProperty(name_radio) === false) {
                        radios_names[name_radio] = [];
                    }
                    radios_names[name_radio].push(input);
                }
                input.removeClass("error");
                input.getParent().removeClass("error-p");
                input.getParent().findAll(".message-error-input").remove();
                if( params.isRequired(input, "This field is required") ) {
                    if( typeof rule !== "undefined" && rule !== null && rule !== "" ) {
                        var rule_accept = utils_validator["is_"+rule](value);
                        if(rule_accept) {
                            params.addErrorInput(input, false, params.createMessage(rule));
                            test_passe.push(value);
                        }
                        else {
                            params.addErrorInput(input, true, params.createMessage(rule));
                            test_passe.pop();
                        }
                    }
                }
               
            } 
		}// for
    
        // corrige for radio inputs
        
        for (var name_radio in radios_names) {
            let radios = radios_names[name_radio];
            let l_radios = radios.length;
            let checked_current = false;
            for (var r = 0; r < l_radios; r++) {
                let radio_box = radios[r];
                if (radio_box.checked) {
                    checked_current = true;
                }
            }
            if (checked_current === false) {
                for (var r = 0; r < l_radios; r++) {
                    let radio_box = radios[r];
                    var rule = radio_box.data("rule");
                    params.addErrorInput(radio_box, true, params.createMessage(rule));
                }
            }
            else {
                for (var r = 0; r < l_radios; r++) {
                    let radio_box = radios[r];
                    var rule = radio_box.data("rule");
                    radio_box.removeClass("error");
                    radio_box.getParent().removeClass("error-p");
                    radio_box.getParent().findAll(".message-error-input").remove();
                    params.addErrorInput(input, false, params.createMessage(rule));
                    test_passe.push(radio_box.checked);
                }
            }
        }
    
		if( test_passe.length === nbr_input || inupts.length === 0 ) {
            if (typeof params.valid === "function" && params.valid !== null) {
                params.valid.call(this, true, "OK");
            }
		}
        else {
            if (typeof params.error === "function" && params.error !== null) {
                params.error.call(this, false, "ERROR");
            }
        }
    
    
}); 