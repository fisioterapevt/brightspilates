import React from "react";

import { ReactComponent as ErrorIcon } from "../../../../assets/svg/error-icon.svg";
import classes from "./HttpError.module.scss";

const HttpError = ({ children }) => {
	return (
		<section className={classes.HttpError}>
			<ErrorIcon />
			{children}
		</section>
	);
};

export default HttpError;
