import React, { useCallback, useReducer } from "react";
import axios from "axios";

import * as actionTypes from "../actionTypes";
import UserContext from "./user-context";
import { userReducer } from "./user-reducers";

import { LOCALES } from "../../i18n";

const userInfoFromStorage = localStorage.getItem("userInfo")
	? JSON.parse(localStorage.getItem("userInfo"))
	: null;

export const UserState = ({ children }) => {
	const initialState = {
		locale: LOCALES.DEFAULT,
		userLogin: { userInfo: userInfoFromStorage },
		successDelete: false,
		users: [],
		isLoggedIn: false,
		loading: false,
		uploading: false,
		message: null,
		httpError: null,
	};

	const [userState, dispatch] = useReducer(userReducer, initialState);

	const { userInfo } = userState.userLogin;

	const setLocaleRussian = () => {
		dispatch({
			type: actionTypes.SET_LOCALE_RUSSIAN,
		});
	};

	const setLocaleEnglish = () => {
		dispatch({
			type: actionTypes.SET_LOCALE_ENGLISH,
		});
	};

	//************************* */
	//********* USER ********** */
	//************************* */

	//@ LOGIN
	const login = async (email, password) => {
		try {
			dispatch({
				type: actionTypes.USER_LOGIN_REQUEST,
			});

			const config = { headers: { "Content-Type": "application/json" } };
			const { data } = await axios.post(
				"/api/users/login",
				{
					email,
					password,
				},
				config
			);

			dispatch({ type: actionTypes.USER_LOGIN_SUCCESS, payload: data });

			//# add user to localStorage
			localStorage.setItem("userInfo", JSON.stringify(data));
		} catch (error) {
			dispatch({
				type: actionTypes.USER_LOGIN_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

	//@ LOGOUT
	const logout = () => {
		localStorage.removeItem("userInfo");
		localStorage.removeItem("order");
		dispatch({ type: actionTypes.USER_LOGOUT });
		dispatch({ type: actionTypes.USER_NEW_PASSWORD_RESET });
		//dispatch({ type: actionTypes.USER_LIST_RESET });
	};

	//@ CREATE USER
	const createUser = async (name, email, password, locale) => {
		try {
			dispatch({
				type: actionTypes.USER_CREATE_REQUEST,
			});

			const config = { headers: { "Content-Type": "application/json" } };
			const { data } = await axios.post(
				"/api/users",
				{
					name,
					email,
					password,
					locale,
				},
				config
			);

			dispatch({ type: actionTypes.USER_CREATE_SUCCESS, payload: data });

			localStorage.setItem("userInfo", JSON.stringify(data));
		} catch (error) {
			dispatch({
				type: actionTypes.USER_CREATE_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

	//@ UPDATE USER PROFILE
	const updateUserProfile = async (user) => {
		try {
			dispatch({
				type: actionTypes.USER_UPDATE_PROFILE_REQUEST,
			});

			//const { userInfo } = userState.userLogin;

			const config = {
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			const { data } = await axios.put(`/api/users/profile`, user, config);
			dispatch({
				type: actionTypes.USER_UPDATE_PROFILE_SUCCESS,
				payload: data,
			});

			localStorage.setItem("userInfo", JSON.stringify(data));
		} catch (error) {
			dispatch({
				type: actionTypes.USER_UPDATE_PROFILE_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

	//@ UPDATE AVATAR
	const updateAvatar = async (name, file) => {
		const formData = new FormData();
		formData.append(name, file);

		try {
			dispatch({
				type: actionTypes.AVATAR_UPDATE_REQUEST,
			});

			const configUpload = {
				headers: { "Content-Type": "multipart/form-data" },
			};

			const { data } = await axios.post(
				"/api/upload",
				formData,
				configUpload
			);

			dispatch({
				type: actionTypes.AVATAR_UPDATE_SUCCESS,
				payload: data,
			});
		} catch (error) {
			console.log(error);
			dispatch({
				type: actionTypes.AVATAR_UPDATE_FAIL,
				payload: error,
			});
		}
	};

	//@ RESET PASSWORD
	const resetPassword = async (email, history, locale) => {
		try {
			dispatch({
				type: actionTypes.USER_NEW_PASSWORD_REQUEST,
			});

			const config = { headers: { "Content-Type": "application/json" } };
			const { data } = await axios.post(
				"/api/users/password/reset",
				{
					email,
					locale,
				},
				config
			);

			dispatch({
				type: actionTypes.USER_NEW_PASSWORD_SUCCESS,
				payload: data,
			});

			if (!data.errorMsg) {
				setTimeout(() => {
					dispatch({
						type: actionTypes.USER_NEW_PASSWORD_RESET,
					});
					history.push("/auth");
				}, 5000);
			}
		} catch (error) {
			dispatch({
				type: actionTypes.USER_NEW_PASSWORD_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

	//@ SET NEW PASSWORD
	const setNewPassword = async (password, token, history) => {
		try {
			dispatch({
				type: actionTypes.USER_SET_PASSWORD_REQUEST,
			});

			//const config = { headers: { "Content-Type": "application/json" } };
			const { data } = await axios.post(
				`/api/users/new/password/${token}`,
				{
					password,
				}
				//config
			);

			console.log(data);

			dispatch({
				type: actionTypes.USER_SET_PASSWORD_SUCCESS,
				payload: data,
			});

			if (data.message) {
				setTimeout(() => {
					dispatch({
						type: actionTypes.USER_NEW_PASSWORD_RESET,
					});
					history.push("/auth");
				}, 20000);
			}
		} catch (error) {
			dispatch({
				type: actionTypes.USER_SET_PASSWORD_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

	//@ RESET ERRORS
	const resetErrors = useCallback(() => {
		dispatch({
			type: actionTypes.STATE_RESET_ERRORS,
		});
	}, []);

	const checkTokenIsValid = () => {
		if (new Date(userInfo.expToken * 1000) <= new Date()) {
			localStorage.removeItem("userInfo");
			localStorage.removeItem("order");
			dispatch({ type: actionTypes.USER_LOGOUT });
			dispatch({ type: actionTypes.USER_NEW_PASSWORD_RESET });
		}
	};

	//************************* */
	//********* ADMIN ********* */
	//************************* */
	//@ GET ALL USERS
	//- for using onto useEffect hook need useCallback hook
	const getListUsers = useCallback(async () => {
		try {
			dispatch({
				type: actionTypes.USER_LIST_REQUEST,
			});

			//const { userInfo } = userState.userLogin;

			const config = {
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			const { data } = await axios.get(`/api/users`, config);

			dispatch({
				type: actionTypes.USER_LIST_SUCCESS,
				payload: data,
			});
		} catch (error) {
			dispatch({
				type: actionTypes.USER_LIST_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	}, [userInfo]);

	//@ DELETE USER BY ID
	const deleteUser = async (id) => {
		try {
			dispatch({
				type: actionTypes.USER_DELETE_REQUEST,
			});

			//const { userInfo } = userState.userLogin;

			const config = {
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			await axios.delete(`/api/users/${id}`, config);

			dispatch({
				type: actionTypes.USER_DELETE_SUCCESS,
			});
		} catch (error) {
			dispatch({
				type: actionTypes.USER_DELETE_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

	//@ UPLOAD CONTENT
	const uploadContent = async (name, file) => {
		console.log(file);
		const formData = new FormData();
		formData.append(name, file);

		try {
			dispatch({
				type: actionTypes.AVATAR_UPDATE_REQUEST,
			});

			const configUpload = {
				headers: { "Content-Type": "multipart/form-data" },
			};

			const { data } = await axios.post(
				"/api/content",
				formData,
				configUpload
			);

			console.log(data);

			//const { userInfo } = userState.userLogin;

			//const config = {
			//	headers: {
			//		Authorization: `Bearer ${userInfo.token}`,
			//	},
			//};

			//await axios.put(`/api/users/profile`, data, config);

			dispatch({
				type: actionTypes.AVATAR_UPDATE_SUCCESS,
				payload: data,
			});

			//await axios.put(`/api/users/profile`, userState.userLogin, config);
		} catch (error) {
			console.log(error);
			dispatch({
				type: actionTypes.AVATAR_UPDATE_FAIL,
				payload: error,
			});
		}
	};

	return (
		<UserContext.Provider
			value={{
				locale: userState.locale,
				userLogin: userState.userLogin,
				users: userState.users,
				successDelete: userState.successDelete,
				loading: userState.loading,
				httpError: userState.httpError,
				message: userState.message,
				setLocaleRussian,
				setLocaleEnglish,
				login,
				logout,
				resetPassword,
				createUser,
				getListUsers,
				updateUserProfile,
				deleteUser,
				updateAvatar,
				uploadContent,
				setNewPassword,
				resetErrors,
				checkTokenIsValid,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
