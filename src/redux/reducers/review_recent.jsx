const initialState = [
  {
    rating: 3,
    review: "Everything was good, but I have to wait a long time",
    createdAt: "2003-03-03",
  }
];;

const getTimeAndDate = val => {
  const parts = val.split('T');
  const dates = parts[0].split('-');
  const date = dates[1] + '/' + dates[2] + '/' + dates[0];
  const times = parts[1].split('.')[0].split(':');
  const time = (times[0] === "12" ? "12" : (parseInt(times[0]) % 12))
             + ':' + times[1]
             + (parseInt(times[0]) > 11 ? ' PM' : ' AM');
  return {
    time: time,
    date: date
  };
}

const reducer = (state = initialState, action) => {
  if(action.type === "RecentReview"){
    state = action.payload.map(val => ({
      ...val,
      createdAt: getTimeAndDate(val.createdAt)
    }));
  }
  return state;
}

export default reducer;