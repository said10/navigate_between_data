import Utils from "./utils";

 // The useful function for others reducers

export default class Reducer {
    constructor(params) {
        this.utils = new Utils();
	}
    
    removeItemFromArray(index, array) {
        const array_new = Object.assign([], array);
        array_new.splice(index, 1);
        return array_new;
    }
    addFromArray(item, array) {
        array = array.concat(item);
        return array;
    }
    
    UpdateFromArray(item, array, index) {
        const array_new = Object.assign([], array);
        array_new[index] = item;
        return array_new;
    }
    
    
    
    
}