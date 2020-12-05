import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./NavLink.module.scss";

const NavigationLink = ({ link, exact, onClick, children }) => {
	return (
		<li className={classes.link}>
			<NavLink
				to={link}
				activeClassName={classes.active}
				exact={exact}
				onClick={onClick}
			>
				{children}
			</NavLink>
		</li>
	);
};

export default NavigationLink;
