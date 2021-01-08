import React from "react";
import NavigationLink from "../NavLinks/NavLink/NavLink";

import classes from "./UserNavigation.module.scss";

const UserNavigation = ({ onClick }) => {
	return (
		<>
			<nav className={classes.userNav}>
				<ul>
					<NavigationLink link="/profile" onClick={onClick}>
						PROFILE
					</NavigationLink>
					<NavigationLink link="/profile" onClick={onClick}>
						PLAYLIST
					</NavigationLink>
				</ul>
			</nav>
		</>
	);
};

export default UserNavigation;
