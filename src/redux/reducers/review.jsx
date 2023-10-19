import { isArray } from "util";

const initialState = [
  {
    percentage: 0,
    level: '5 Star',
  },
  {
    percentage: 0,
    level: '4 Star',
  },
  {
    percentage: 0,
    level: '3 Star',
  },
  {
    percentage: 0,
    level: '2 Star',
  },
  {
    percentage: 0,
    level: '1 Star',
  },
];

const reducer = (state = initialState, action) => {
  if(action.type === "Review"){
    if(isArray(action.payload) && action.payload.length){
      state = action.payload;
    }
  }
  return state;
}

export default reducer;