let browserLang = navigator.language || navigator.userLanguage;

if (navigator.language || navigator.userLanguage === `ru`) {
	browserLang = `ru-RU`;
} else if (navigator.language || navigator.userLanguage === `en`) {
	browserLang = `en-US`;
}

export const LOCALES = {
	RUSSIAN: `ru-RU`,
	ENGLISH: `en-US`,
	DEFAULT: browserLang,
};
