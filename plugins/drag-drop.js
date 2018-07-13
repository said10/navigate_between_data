dom.addPlugin("dragDropComponents", function(params) {
	var composants = this;
	params = params || {};
    var move = params.move = true;
	var parent = dom.get(params.parent);
	var class_sortable = params.sortable || ".sortable";
	var sortable = parent.find(class_sortable);
	//var overlay = dom.get(".overlay");
	params.components_added = [];
	params.type_drag = params.type_drag  || "drag-mode";
    var doc = document.documentElement;
    var scroll_value = doc.scrollTop;
    
    function verifyChild(child, x_up, y_up) {
        var result = false;
        if (child !== null) {
            var offset_sortable = child.offset();
            if ( (x_up >= offset_sortable.left && x_up < offset_sortable.left+offset_sortable.width ) && (y_up >= offset_sortable.top && y_up < offset_sortable.top+offset_sortable.height )  && !child.hasClass("off-sortable")) {
                result = true;
            }
        }
        return result;
    }
	composants.on("mousedown", function(evt) {
        sortable = dom.get(class_sortable);
        if (this.hasClass("element-draggable") === false) {
            if (sortable !== null) {
                sortable.addClass("sortable");
                if (typeof params.afterDown === "function" && params.afterDown !== null) {
                    params.afterDown.call(this, parent, params);
                }
            }
            var element_this = this;
            if (dom.get(".element-draggable") !== null) {
                dom.get(".element-draggable").removeClass("element-draggable");
            }
            element_this.addClass("element-draggable");
            if (typeof params.changeSortable === "function" && params.changeSortable !== null) {
                params.child_sortable = params.changeSortable.call(element_this, parent, params,  params.move);
            }
            if (typeof params.sortableElement !== "undefined" && params.sortableElement !== null) {
                //sortable.removeClass("sortable");
                sortable = params.sortableElement;
            }
        
            var child_sortable = parent.findAll(params.child_sortable);
            if( child_sortable.length > 0 || sortable !== null ) {
                child_sortable.addClass("sortable");
                var composant = this;
                var clone = composant.clone();
                //overlay.show();
                var offset = composant.offset();
                clone.addClass("no-animate draggable");
                var width_clone = composant.offset().width;
                scroll_value = doc.scrollTop;
                var top_value = scroll_value+offset.top;
                clone.css({ "width" : width_clone+"px", "position" : "absolute", "top" : top_value+"px", "left" : offset.left+"px"  });
                var body = dom.get("body");
                move = params.move =  true;
                body.on("mousemove", function(evt) {
                    
                if (move && clone !== null) {
                    scroll_value = doc.scrollTop;
                    var x = evt.clientX+10;
                    var y = evt.clientY+10+scroll_value;
                    clone.css({ "top" : y+"px", "left" : x+"px"  });
                    
                    var result_sortable_child = false;
                    var result_sortable = verifyChild(sortable, x, y);
                    if (child_sortable !== null && child_sortable.length > 0) {
                        var nbr_child_sortable = child_sortable.length;
                        child_sortable.removeClass("active");
                        for (var c = 0; c < nbr_child_sortable; c++) {
                            var child = child_sortable.eq(c);
                            var result_child = verifyChild(child, x, y);
                            if (result_child) {
                                child.addClass("active");
                            }
                            else {
                                child.removeClass("active");
                            }
                        }
                    }
                }

                evt.preventDefault();
            }, true);
                body.on("mouseup", function(evt) {
                  var result_sortable = false;
                  var x_up = evt.clientX;
                  var y_up = evt.clientY;
                  if (sortable !== null) {
                    move = params.move = false;
                    var offset_sortable = sortable.offset();
                     result_sortable = verifyChild(sortable, x_up, y_up);
                    }
                    var result_sortable_child = false;
                    if (child_sortable !== null && child_sortable.length > 0) {
                        var nbr_child_sortable = child_sortable.length;
                        for (var c = 0; c < nbr_child_sortable; c++) {
                            var child = child_sortable.eq(c);
                            var result_child = verifyChild(child, x_up, y_up);
                            if (result_child) {
                                result_sortable_child = result_child;
                                sortable = child;
                                c = nbr_child_sortable;
                            }
                        }
                        child_sortable.removeClass("active");
                    }
                    if ( result_sortable || result_sortable_child ) {
                        if (clone !== null) {
                            if (typeof params.upAction !== "undefined" && typeof params.upAction === "function") {
                                params.upAction.call(this, sortable, { label : clone.attr("data-label"), type : clone.attr("data-type"), name : clone.attr("data-name") }, params);
                            }
                            var component = clone;
                            var name = component.attr("data-name");
                            var label = component.attr("data-label");
                            var type = component.attr("data-type");
                            var new_components_added  = params.afterUp.call(params, type) || [];
                            if (!dom.findInArray(new_components_added, name)) {
                                params.components_added = new_components_added || [];
                            }
                            if (typeof params.afterAdded !== "undefined" && typeof params.afterAdded === "function") {
                                params.afterAdded.call(params, clone, sortable);
                            }
                            
                            component.remove();
                        }

                        body.off("mousemove");
                        clone = null;
                    }
                    else {
                        if (clone !== null) {
                            body.off("mousemove");
                            if (typeof params.upAction !== "undefined" && typeof params.upAction === "function") {
                                params.upAction.call(this, null, clone, params);
                            }
                            clone.removeClass("no-animate draggable");
                            scroll_value = doc.scrollTop;
                            var top_value = scroll_value+offset.top;
                            clone.css({ "top" : top_value+"px", "left" : offset.left+"px"  });
                            var timer = setTimeout(function() {
                                clone.remove();
                                clone = null;
                                element_this.removeClass("element-draggable");
                            }, 600);
                        }
                    }
                    //sortable.removeClass("sortable");
                    var sortables = dom.getAll(".sortable");
                    sortables.removeClass("sortable");
           
                //overlay.hide();
                evt.preventDefault();
            }, true);
        }
        }
		evt.preventDefault();
	});
    
}); 