import React from "react";
import { Link } from "react-router-dom";

import { ReactComponent as BackIcon } from "../../../../assets/svg/go_back-icon.svg";

import classes from "./GoBackButton.module.scss";

const GoBackButton = ({ to, externalStyles, children, onClick }) => {
	const clsButton = [classes.GoBackButton, externalStyles];

	return (
		<Link to={to} className={clsButton.join(" ")} onClick={onClick}>
			<BackIcon />
		</Link>
	);
};

export default GoBackButton;
