import { combineReducers } from "redux";
import { userLoginReducer } from "./userReducer";
import {
  projectListReducer,
  projectCreateReducer,
  projectDeleteReducer,
  projectUpdateReducer,
  projectDetailsReducer,
} from "./projectsReducer";

import {
  certificateCreateReducer,
  certificateListReducer,
  certificateDeleteReducer,
  certificateUpdateReducer,
  certificateDetailsReducer,
} from "./certReducer";

import {
  blogCreateReducer,
  blogDeleteReducer,
  blogDetailsReducer,
  blogListReducer,
  blogUpdateReducer,
} from "./blogReducer";
// reducers
import { alert } from "./alertReducer";

export const rootReducer = combineReducers({
  // Reducer for Alert
  alert: alert,
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
