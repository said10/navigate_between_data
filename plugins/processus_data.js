import Utils from "../src/base/utils"

export default class ProcessData {
    constructor() {
        this.utils = new Utils();
        this.x = "";
        this.y = "";
        this.attr_data = null;
        this.return_data = {};
    }
    
    processus(data, x, y) {
        let object_type = this.utils.is_object(data);
        let array_type = this.utils.is_array(data);
        if (object_type === false && array_type === false) {
            return { status : "error", message : "Data is Not Valid, Please Check the source and Try again" };
        }
        else {
            if (object_type === true && array_type === false) {
                return { status : "success", message : "", data : this.processusObject(data, x,y) };
                
            }
            if (object_type === false && array_type === true) {
                return { status : "success", message : "", data : this.processusArray(data, x,y) };
            }
        }
    }
    
    processusObject(data, x, y) {
        this.attr_data = null;
        var data_item_x = this.findAttribute(data, x);
        var data_item_y = this.findAttribute(data, y);
        this.return_data.x.push(data_item_x);
        this.return_data.y.push(data_item_y);
    }
    processusArray(data, x, y) {
        this.attr_data = null;
        var l = data.length;
        this.return_data["x"] = [];
        this.return_data["y"] = [];
        for (var i = 0; i < l ;i++) {
            var item = data[i];
            this.attr_data = null;
            var data_item_x = this.findAttribute(item, x);
            this.attr_data = null;
            var data_item_y = this.findAttribute(item, y);
            if (typeof data_item_x === "undefined") {
                data_item_x = 0;
            }
            if (typeof data_item_y === "undefined") {
                data_item_y = 0;
            }
            this.return_data.x.push(data_item_x);
            this.return_data.y.push(data_item_y);
            
        }
        return this.return_data;
    }
    
    findAttribute(data, attr) {
        for (var key in data) {
            let item = data[key];
            let object_type = this.utils.is_object(item);
            let array_type = this.utils.is_array(item);
            if (array_type === true) {
                item = item[0];
                this.findAttribute(item, attr);
            }
            if (object_type === true) {
                let attr_exist = item[attr];    
                if (typeof attr_exist !== "undefined") {
                    let object_type_item = this.utils.is_object(attr_exist);
                    let array_type_item = this.utils.is_array(attr_exist);
                    if (object_type_item === true || array_type_item === true) {
                        this.findAttribute(attr_exist, attr);
                    }
                    else {
                        if (key === attr) {
                            this.attr_data = attr_exist;
                            return attr_exist;
                        }
                        
                    }
                    
                }
                else {
                    let object_type_item = this.utils.is_object(item);
                    let array_type_item = this.utils.is_array(item);
                    if (object_type_item === true || array_type_item === true) {
                        this.findAttribute(item, attr);
                    }
                }
            }
            if (object_type === false && array_type === false) {
                if (key === attr) {
                    this.attr_data = item;
                    return item;
                }
                
            }
        }
        if (this.attr_data !== null) {
            return this.attr_data;
        }
    }
    
}