import React from "react";

import { ReactComponent as OneBarsIcon } from "../../../assets/svg/one_bars-icon.svg";
import { ReactComponent as TwoBarsIcon } from "../../../assets/svg/two_bars-icon.svg";
import { ReactComponent as ThreeBarsIcon } from "../../../assets/svg/three_bars-icon.svg";
import { ReactComponent as FoureBarsIcon } from "../../../assets/svg/foure_bars-icon.svg";
import translate from "../../../i18n/translate";

import classes from "./Level.module.scss";

const Level = ({ level }) => {
	let bars;
	switch (level) {
		case "entering":
			bars = <OneBarsIcon />;
			break;
		case "beginer":
			bars = <TwoBarsIcon />;
			break;
		case "intermediate":
			bars = <ThreeBarsIcon />;
			break;
		case "advanced":
			bars = <FoureBarsIcon />;
			break;
		default:
			return (bars = <OneBarsIcon />);
	}

	return (
		<div className={classes.Level}>
			<span>{bars}</span>
			<p>{translate(level, {})}</p>
		</div>
	);
};

export default Level;
