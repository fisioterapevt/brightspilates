import React, { useCallback, useReducer } from "react";
import axios from "axios";

import * as actionTypes from "../actionTypes";
import GlobalContext from "./global-context";
import { globalReducer } from "./global-reducers";

import { LOCALES } from "../../i18n";

const userInfoFromStorage = localStorage.getItem("userInfo")
	? JSON.parse(localStorage.getItem("userInfo"))
	: null;

export const GlobalState = ({ children }) => {
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

	const [globalState, dispatch] = useReducer(globalReducer, initialState);

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

	//********* ADMIN ********* */
	//@ GET ALL USERS
	//- for using onto useEffect hook need useCallback hook
	const getListUsers = useCallback(async () => {
		try {
			dispatch({
				type: actionTypes.USER_LIST_REQUEST,
			});

			const { userInfo } = globalState.userLogin;

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
	}, [globalState.userLogin]);

	//@ DELETE USER BY ID
	const deleteUser = async (id) => {
		try {
			dispatch({
				type: actionTypes.USER_DELETE_REQUEST,
			});

			const { userInfo } = globalState.userLogin;

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

			//const { userInfo } = globalState.userLogin;

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

			//await axios.put(`/api/users/profile`, globalState.userLogin, config);
		} catch (error) {
			console.log(error);
			dispatch({
				type: actionTypes.AVATAR_UPDATE_FAIL,
				payload: error,
			});
		}
	};
	//************************* */
	//********* ADMIN ********* */
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
			localStorage.setItem("userInfo", JSON.stringify(data));

			//@ logout when token is expired
			setTimeout(() => {
				localStorage.removeItem("userInfo");
				dispatch({ type: actionTypes.USER_LOGOUT });
			}, data.expToken * 1000);
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
		dispatch({ type: actionTypes.USER_LOGOUT });
		dispatch({ type: actionTypes.USER_NEW_PASSWORD_RESET });
		//dispatch({ type: actionTypes.USER_LIST_RESET });
		//dispatch({ type: actionTypes.ORDER_LIST_MY_RESET });
	};

	//@ REGISTER USER
	const registerUser = async (name, email, password, locale) => {
		try {
			dispatch({
				type: actionTypes.USER_REGISTER_REQUEST,
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

			dispatch({ type: actionTypes.USER_REGISTER_SUCCESS, payload: data });

			localStorage.setItem("userInfo", JSON.stringify(data));
		} catch (error) {
			dispatch({
				type: actionTypes.USER_REGISTER_FAIL,
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

			const { userInfo } = globalState.userLogin;

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

			//console.log(data);

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

	return (
		<GlobalContext.Provider
			value={{
				locale: globalState.locale,
				userLogin: globalState.userLogin,
				users: globalState.users,
				successDelete: globalState.successDelete,
				loading: globalState.loading,
				httpError: globalState.httpError,
				message: globalState.message,
				setLocaleRussian,
				setLocaleEnglish,
				login,
				logout,
				resetPassword,
				registerUser,
				getListUsers,
				updateUserProfile,
				deleteUser,
				updateAvatar,
				uploadContent,
				setNewPassword,
				resetErrors,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
