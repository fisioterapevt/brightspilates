import React from "react";
import classes from "./Tab.module.scss";

import { TransitionGroup, CSSTransition } from "react-transition-group";

const Tab = ({ isSelected, children }) => {
	return (
		<div className={classes.Tab}>
			<CSSTransition
				in={isSelected}
				timeout={500}
				classNames={{
					enter: classes.tabEnter,
					enterActive: classes.tabEnterActive,
					enterDone: classes.tabEnterDone,
					exit: classes.tabExit,
					exitActive: classes.tabExitActive,
					exitDone: classes.tabExitDone,
				}}
				mountOnEnter
				unmountOnExit
			>
				<div className={classes.innerContent}>{children}</div>
			</CSSTransition>
		</div>
	);
};

export default Tab;
