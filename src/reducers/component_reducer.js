export default function (state = false, action) {
  switch (action.type) {
    case 'COMPONENT_DATA':
      return action.payload;
  }
    return state;
}