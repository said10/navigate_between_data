import Reducer from "../base/reducer";

export default function (state = [], action) {
    
  const reducer = new Reducer();
   switch (action.type) {
        case 'ADD_SOURCE':
          return reducer.addFromArray(action.payload, state);
        case 'REMOVE_SOURCE':
            return reducer.addFromArray(action.payload, state);
        case 'Update_SOURCE':
            return reducer.addFromArray(action.payload, state, action.index);
    }
    return state;
}




