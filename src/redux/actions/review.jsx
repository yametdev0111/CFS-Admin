import axios from "../axiosConfig"

export const receiveDetailReview = () => dispatch => {
  axios.get("/detail/get")
  .then(response => {
    if(response.data.result){
      console.log("Detail Review Response ------------------------------>\n", response.data.data, "\n");
      dispatch({
        type: "ReviewDetailEdited",
        payload: response.data.data
      });
    }
  })
}

export const receive = () => dispatch => {
  axios.get("/normal/get")
  .then(response => {
    if(response.data.result){
      dispatch({
        type: "Review",
        payload: response.data.data
      });
    }
  })
}

export const receiveRecent = count => dispatch => {
  axios.get("/normal/recent", count)
  .then(response => {
    if(response.data.result){
      dispatch({
        type: "RecentReview",
        payload: response.data.data
      });
    }
  })
}