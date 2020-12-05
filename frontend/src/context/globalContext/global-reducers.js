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

export const globalReducer = (state, action) => {
	switch (action.type) {
		case actionTypes.SET_LOCALE_RUSSIAN:
			return setLocaleRussian(state);
		case actionTypes.SET_LOCALE_ENGLISH:
			return setLocaleEnglish(state);
		default:
			return state;
	}
};
