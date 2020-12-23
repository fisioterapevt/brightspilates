import React from "react";
import Calendar from "../../components/UIElements/Calendar/Calendar";

import classes from "./Exercises.module.scss";

const Exercises = () => {
	return (
		<div className={classes.Exercises}>
			<h2 className={classes.headline}>Exercises</h2>
			<div className={classes.calendar}>
				<Calendar />
			</div>
		</div>
	);
};

export default Exercises;
