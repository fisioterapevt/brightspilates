import React from "react";
//import { CSSTransition } from "react-transition-group";

import classes from "./DropdownMenu.module.scss";

// rendering drow menu  through portal
const DropdownMenu = ({ children, onMouseEnter, onMouseLeave }) => {
	return (
		//<CSSTransition
		//	in={show}
		//	timeout={200}
		//	classNames={{
		//		enter: classes.slideDropDownEnter,
		//		enterActive: classes.slideDropDownEnterActive,
		//		enterDone: classes.slideDropDownEnterDone,
		//		exit: classes.slideDropDownExit,
		//		exitActive: classes.slideDropDownExitActive,
		//		exitDone: classes.slideDropDownExitDone,
		//	}}
		//	mountOnEnter
		//	unmountOnExit
		//>
		<aside
			className={classes.DropdownMenu}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			{children}
		</aside>
		//</CSSTransition>
	);
};

export default DropdownMenu;
