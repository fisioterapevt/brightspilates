import React from "react";

import { CSSTransition } from "react-transition-group";

import classes from "./DropdownMenu.module.scss";

// rendering drow menu  through portal
const DropdownMenu = ({ show, onMouseEnter, onMouseLeave, children }) => {
	return (
		<CSSTransition
			in={show}
			timeout={350}
			classNames={{
				enter: classes.showEnter,
				enterActive: classes.showEnterActive,
				enterDone: classes.showEnterDone,
				exit: classes.showExit,
				exitActive: classes.showExitActive,
				exitDone: classes.showExitDone,
			}}
			mountOnEnter
			unmountOnExit
		>
			<aside
				className={classes.DropdownMenu}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
			>
				<div className={classes.innerContent}>{children}</div>
			</aside>
		</CSSTransition>
	);
};

export default DropdownMenu;
