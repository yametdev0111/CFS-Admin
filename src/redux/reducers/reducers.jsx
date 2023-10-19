import { combineReducers } from "redux";
import review from "./review";
import reviewrecent from "./review_recent";
import reviewdetail from './review_detail';

export default combineReducers({
  review,
  reviewrecent,
  reviewdetail,
});
