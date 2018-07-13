export default function (state = false, action) {
  switch (action.type) {
     case 'COMPONENT':
      return action.payload;
  }
    return state;
}