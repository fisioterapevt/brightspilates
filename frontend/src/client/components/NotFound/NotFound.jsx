import React from "react";
import { useHistory } from "react-router-dom";

import classes from "./NotFound.module.scss";
import translate from "../../../i18n/messages/translate";

const NotFound = ({ message }) => {
	const history = useHistory();

	return (
		<div className={classes.NotFound}>
			<div className={classes.trademark}></div>
			<div className={classes.message}>
				<p>{message ? message : translate(`notFound`)}</p>
				<button
					className={classes.goBack}
					type="button"
					onClick={() => history.goBack()}
				>
					{translate(`differentQuery`)}
				</button>
			</div>
		</div>
	);
};

export default NotFound;
