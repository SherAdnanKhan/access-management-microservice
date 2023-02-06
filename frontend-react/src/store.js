import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { authReducers, userDetailReducers, userUpdateReducers } from './reducers/userReducers';
import { applicationDetailsReducers, applicationsReducers, applicationStatusReducers, applicationUserReducers, locationReducers, ntLoginUserReducers, rolesReducers } from './reducers/applicationReducers';
import { logDetailsReducers } from './reducers/logReducers';


const reducer = combineReducers({
  userLogin: authReducers, userDetails: userDetailReducers,
  userUpdate: userUpdateReducers,

  ntnInfo: ntLoginUserReducers, applicationsInfo: applicationsReducers,
  rolesInfo: rolesReducers, applicationDetailInfo: applicationDetailsReducers,
  appUserCreateinfo: applicationUserReducers,
  applicationStatusInfo: applicationStatusReducers, locationInfo: locationReducers,

  logsInfo: logDetailsReducers
});
const middleware = [thunk];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};
export const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)
