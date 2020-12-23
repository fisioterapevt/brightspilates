import React from "react";

import { ReactComponent as OpenEye } from "../../../../../assets/svg/visible_eye-icon.svg";
import { ReactComponent as CloseEye } from "../../../../../assets/svg/invisible_eye-icon.svg";

import classes from "./PassToggle.module.scss";

const PassToggle = ({ onToggle, isView }) => {
	return (
		<i className={classes.PassToggle} onClick={onToggle}>
			{isView ? <CloseEye /> : <OpenEye />}
		</i>
	);
};

export default PassToggle;
