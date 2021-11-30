import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// import reducers
import { userLoginReducer } from "./reducers/userReducer";
import {
  projectListReducer,
  projectCreateReducer,
  projectDeleteReducer,
  projectUpdateReducer,
  projectDetailsReducer,
} from "./reducers/projectsReducer";

import {
  certificateCreateReducer,
  certificateListReducer,
  certificateDeleteReducer,
  certificateUpdateReducer,
  certificateDetailsReducer,
} from "./reducers/certReducer";

const middleware = [thunk];

const reducer = combineReducers({
  userLogin: userLoginReducer,
  getProjects: projectListReducer,
  projectUpdate: projectUpdateReducer,
  projectDelete: projectDeleteReducer,
  projectCreate: projectCreateReducer,
  projectDetails: projectDetailsReducer,
  listCerts: certificateListReducer,
  certUpdate: certificateUpdateReducer,
  certDelete: certificateDeleteReducer,
  certCreate: certificateCreateReducer,
  certDetails: certificateDetailsReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
