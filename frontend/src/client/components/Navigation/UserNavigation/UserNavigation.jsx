import React from "react";
import NavigationLink from "../NavLinks/NavLink/NavLink";

import classes from "./UserNavigation.module.scss";

const UserNavigation = () => {
	return (
		<>
			<nav className={classes.userNav}>
				<ul>
					<NavigationLink link="/profile">PROFILE</NavigationLink>
					<NavigationLink link="/profile">PLAYLIST</NavigationLink>
				</ul>
			</nav>
		</>
	);
};

export default UserNavigation;
