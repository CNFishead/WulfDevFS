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

import {
  blogCreateReducer,
  blogDeleteReducer,
  blogDetailsReducer,
  blogListReducer,
  blogUpdateReducer,
} from "./reducers/blogReducer";

const middleware = [thunk];

const reducer = combineReducers({
  userLogin: userLoginReducer,
  // Project Reducers
  getProjects: projectListReducer,
  projectUpdate: projectUpdateReducer,
  projectDelete: projectDeleteReducer,
  projectCreate: projectCreateReducer,
  projectDetails: projectDetailsReducer,
  // Certificate reducers
  listCerts: certificateListReducer,
  certUpdate: certificateUpdateReducer,
  certDelete: certificateDeleteReducer,
  certCreate: certificateCreateReducer,
  certDetails: certificateDetailsReducer,
  // Blog Reducers
  listBlogs: blogListReducer,
  blogUpdate: blogUpdateReducer,
  blogDelete: blogDeleteReducer,
  blogCreate: blogCreateReducer,
  blogDetails: blogDetailsReducer,
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
