import axios from 'axios';

export function addSource(source) {
    return {
      type: 'ADD_SOURCE',
      payload : source
    };
}

export function removeSource(index) {
    return {
      type: 'REMOVE_SOURCE',
      payload : index
    };
}
export function updateSource(source, index) {
    return {
      type: 'UPDATE_SOURCE',
      payload : source,
      index : index
    };
}
export function openPopup(state) {
    return {
      type: 'OPEN_POPUP',
      payload : state
    };
}

export function dragComponent(component) {
    return {
      type: 'COMPONENT',
      payload : component,
    };
}
/*
export function componentData(promise) {
   // url = "http://api.population.io/1.0/population/2000/United%20States/?format=json";
    //const request = axios.get(url);
    return {
      type: 'COMPONENT_DATA',
      payload : promise
    };
}*/