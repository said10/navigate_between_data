export default function (state = false, action) {
  switch (action.type) {
    case 'OPEN_POPUP':
      return action.payload;
  }
    return state;
}
