import React, { useState } from "react";

import Button from "../Button/Button";
import translate from "../../../../i18n/translate";

import classes from "./ReadMore.module.scss";

const ReadMore = ({ children, maxCharacterCount = 100 }) => {
	const text = children;

	const [isMinimized, setIsMinimized] = useState(true);

	console.log(isMinimized);

	const resultString = isMinimized ? text.slice(0, maxCharacterCount) : text;

	return (
		<div className={classes.ReadMore}>
			<p>{resultString}</p>
			<Button
				onClick={() => setIsMinimized((prevState) => !prevState)}
				externalStyles={classes.button}
			>
				{isMinimized
					? translate("Read More", {})
					: translate("Read Less", {})}
			</Button>
		</div>
	);
};

export default ReadMore;
