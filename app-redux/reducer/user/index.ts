import { SET_USER } from "@/app-redux/action";
import { Action } from "@/app-redux/enties/interfaces/action";

export default (state = null, action: Action) => {
  if (action.type === SET_USER) {
    return action.payload;
  }
  return state;
};
