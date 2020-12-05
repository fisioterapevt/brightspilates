import React, { useContext } from "react";
import classes from "./LangToggle.module.scss";

import GlobalContext from "../../../context/globalContext/global-context";

const LangToggle = ({ externalStyles }) => {
	const { locale, setLocaleRussian, setLocaleEnglish } = useContext(
		GlobalContext
	);
	return (
		<section className={[classes.LangToggle, externalStyles].join(" ")}>
			<button
				type="button"
				onClick={setLocaleRussian}
				disabled={locale === "ru-RU"}
			>
				RUS
			</button>
			<button
				type="button"
				onClick={setLocaleEnglish}
				disabled={locale === "en-US"}
			>
				ENG
			</button>
		</section>
	);
};

export default LangToggle;
