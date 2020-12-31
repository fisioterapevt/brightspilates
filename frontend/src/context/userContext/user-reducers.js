import { updateObject } from "../../shared/updateObject";
import * as actionTypes from "../actionTypes";

import { LOCALES } from "../../i18n";

//**********************************/
//*********** LOCALE ***************/
//**********************************/
const setLocaleRussian = (state) => {
	const updateLocale = LOCALES.RUSSIAN;
	return updateObject(state, {
		locale: updateLocale,
	});
};

const setLocaleEnglish = (state) => {
	const updateLocale = LOCALES.ENGLISH;
	return updateObject(state, {
		locale: updateLocale,
	});
};

//**********************************/
//************* USER ***************/
//**********************************/
const fetchStart = (state, action) => {
	return updateObject(state, {
		loading: true,
		message: null,
		httpError: null,
	});
};

const uploadStart = (state, action) => {
	return updateObject(state, { loading: true });
};

export const login = (state, data) => {
	let updatedUserLogin = state.userLogin;
	updatedUserLogin = updateObject(state.userLogin, {
		userInfo: data,
	});

	return updateObject(state, {
		loading: false,
		isLoggedIn: true,
		httpError: null,
		userLogin: updatedUserLogin,
	});
};

export const logout = (state) => {
	let updatedUserLogin = state.userLogin;

	updatedUserLogin = updateObject(state.userLogin, {
		userInfo: null,
	});

	return updateObject(state, {
		loading: false,
		isLoggedIn: false,
		httpError: null,
		userLogin: updatedUserLogin,
	});
};

export const getUsers = (state, data) => {
	console.log(data);
	return updateObject(state, {
		loading: false,
		successDelete: false,
		users: data,
	});
};

export const updateUserProfile = (state, data) => {
	let updatedUserLogin = state.userLogin;
	updatedUserLogin = updateObject(state.userLogin, {
		userInfo: data,
	});
	return updateObject(state, {
		loading: false,
		//isLoggedIn: true,
		httpError: null,
		userLogin: updatedUserLogin,
	});
};

export const deleteUser = (state) => {
	return updateObject(state, {
		loading: false,
		successDelete: true,
	});
};

const updateAvatar = (state, url) => {
	let updatedUserLogin = state.userLogin;
	let updatedUserInfo = updatedUserLogin.userInfo;

	updatedUserInfo = updateObject(updatedUserInfo, { image: url });
	updatedUserLogin = updateObject(state.userLogin, {
		userInfo: updatedUserInfo,
	});

	return updateObject(state, { userLogin: updatedUserLogin });
};

export const passError = (state, error) => {
	//console.log(`ERROR FROM USER REDUCERS: `, error);
	return updateObject(state, { loading: false, httpError: error });
};

export const resetPassword = (state, data) => {
	return updateObject(state, {
		loading: false,
		message: data.successMsg,
		httpError: data.errorMsg,
	});
};

export const setNewPassword = (state, data) => {
	return updateObject(state, {
		loading: false,
		message: data.message,
		//httpError: data.errorMsg,
	});
};

export const reset = (state) => {
	return updateObject(state, {
		loading: false,
		uploading: false,
		message: null,
		httpError: null,
	});
};

//**********************************/
//************* FILE ***************/
//**********************************/

export const userReducer = (state, action) => {
	switch (action.type) {
		case actionTypes.SET_LOCALE_RUSSIAN:
			return setLocaleRussian(state);
		case actionTypes.SET_LOCALE_ENGLISH:
			return setLocaleEnglish(state);

		case actionTypes.USER_LOGIN_REQUEST:
			return fetchStart(state);
		case actionTypes.USER_LOGIN_SUCCESS:
			return login(state, action.payload);
		case actionTypes.USER_LOGIN_FAIL:
			return passError(state, action.payload);
		case actionTypes.USER_LOGOUT:
			return logout(state);

		case actionTypes.USER_CREATE_REQUEST:
			return fetchStart(state);
		case actionTypes.USER_CREATE_SUCCESS:
			return login(state, action.payload);
		case actionTypes.USER_CREATE_FAIL:
			return passError(state, action.payload);

		case actionTypes.USER_UPDATE_PROFILE_REQUEST:
			return fetchStart(state);
		case actionTypes.USER_UPDATE_PROFILE_SUCCESS:
			return updateUserProfile(state, action.payload);
		case actionTypes.USER_UPDATE_PROFILE_FAIL:
			return passError(state, action.payload);

		case actionTypes.USER_DELETE_REQUEST:
			return fetchStart(state);
		case actionTypes.USER_DELETE_SUCCESS:
			return deleteUser(state);
		case actionTypes.USER_DELETE_FAIL:
			return passError(state, action.payload);

		case actionTypes.USER_LIST_REQUEST:
			return fetchStart(state);
		case actionTypes.USER_LIST_SUCCESS:
			return getUsers(state, action.payload);
		case actionTypes.USER_LIST_FAIL:
			return passError(state, action.payload);

		case actionTypes.AVATAR_UPDATE_REQUEST:
			return uploadStart(state);
		case actionTypes.AVATAR_UPDATE_SUCCESS:
			return updateAvatar(state, action.payload);
		case actionTypes.AVATAR_UPDATE_FAIL:
			return passError(state, action.payload);
		//case actionTypes.AVATAR_UPDATE_RESET:
		//	return resetUpload(state);

		case actionTypes.USER_NEW_PASSWORD_REQUEST:
			return fetchStart(state);
		case actionTypes.USER_NEW_PASSWORD_SUCCESS:
			return resetPassword(state, action.payload);
		case actionTypes.USER_NEW_PASSWORD_FAIL:
			return passError(state, action.payload);
		case actionTypes.USER_NEW_PASSWORD_RESET:
			return reset(state);

		case actionTypes.USER_SET_PASSWORD_REQUEST:
			return fetchStart(state);
		case actionTypes.USER_SET_PASSWORD_SUCCESS:
			return setNewPassword(state, action.payload);
		case actionTypes.USER_SET_PASSWORD_FAIL:
			return passError(state, action.payload);

		case actionTypes.STATE_RESET_ERRORS:
			return reset(state);

		default:
			return state;
	}
};
