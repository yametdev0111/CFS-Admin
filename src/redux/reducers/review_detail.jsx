const initialState = [
  {
    data: [0, 0, 0, 0, 0],
    label: '🙁',
    stack: 'total',
    color: '#70AD47'
  },
  {
    data: [0, 0, 0, 0, 0],
    label: '😐',
    stack: 'total',
    color: '#FFC000'
  },
  {
    data: [0, 0, 0, 0, 0],
    label: '🙂',
    stack: 'total',
    color: '#ED7D31'
  }
];
const color = ["#70AD47", "#FFC000", "#ED7D31"]

const reducer = (state = initialState, action) => {
  if(action.type === "ReviewDetailEdited"){
    console.log("Incoming Detail Rating Edited Action", action.payload.length, action);
    state = action.payload.map( ( val, index ) => ({
      ...val,
      color: color[index]
    }));
  }
  return state;
}

export default reducer;