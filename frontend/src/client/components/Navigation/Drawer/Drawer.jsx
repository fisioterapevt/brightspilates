import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import classes from "./Drawer.module.scss";
import { ReactComponent as Logo } from "../../../../assets/svg/logo.svg";
import LangToggle from "../../../UIcomponents/LangToggle/LangToggle";

// rendering drow menu  through portal
const Drawer = ({ children, closeDrawerHandler, show }) => {
	const content = (
		<CSSTransition
			in={show}
			timeout={200}
			classNames={{
				enter: classes.slideDropDownEnter,
				enterActive: classes.slideDropDownEnterActive,
				enterDone: classes.slideDropDownEnterDone,
				exit: classes.slideDropDownExit,
				exitActive: classes.slideDropDownExitActive,
				exitDone: classes.slideDropDownExitDone,
			}}
			mountOnEnter
			unmountOnExit
		>
			<aside className={classes.Drawer}>
				<Logo className={classes.logo} />
				<LangToggle externalStyles={classes.langToggle} />
				<button
					className={classes.closeButton}
					type="button"
					onClick={closeDrawerHandler}
				></button>
				{children}
			</aside>
		</CSSTransition>
	);

	return ReactDOM.createPortal(
		content,
		document.getElementById("drawer-hook")
	);
};

export default Drawer;
