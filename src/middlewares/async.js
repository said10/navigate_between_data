export default function({dispatch}) {
    return next => action => {
        
        if (!action.payload  || !action.payload.then) {
            return next(action);
        }
        
        action.payload.then(function(response) {
            const array_new = Object.assign([], response.data);
           const new_action = {...action, payload: array_new};
            dispatch(new_action);
        });
    }
}