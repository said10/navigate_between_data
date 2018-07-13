import { combineReducers } from 'redux';
import HomeReducer from './home_reducers';
import PopupReducer from './popup_reducer';
import GraphReducer from './graph_reducer';
//import ComponentReducer from './component_reducer';

const rootReducer = combineReducers({
  sources : HomeReducer,
  open : PopupReducer,
  drag : GraphReducer,
  //component : ComponentReducer
});

export default rootReducer;
