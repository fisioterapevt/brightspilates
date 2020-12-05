import React, { useReducer } from "react";

import * as actionTypes from "../actionTypes";
import GlobalContext from "./global-context";
import { globalReducer } from "./global-reducers";

import { LOCALES } from "../../i18n";

export const GlobalState = ({ children }) => {
	const initialState = {
		locale: LOCALES.DEFAULT,
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

	return (
		<GlobalContext.Provider
			value={{
				locale: globalState.locale,
				setLocaleRussian,
				setLocaleEnglish,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
