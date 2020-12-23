import React from "react";
import NavigationLink from "../NavLinks/NavLink/NavLink";

import classes from "./AdminNavigation.module.scss";

const AdminNavigation = () => {
	return (
		<>
			<nav className={classes.adminNav}>
				<ul>
					<NavigationLink link="/admin/userlist">Users</NavigationLink>
					<NavigationLink link="/admin/videolist">Videos</NavigationLink>
				</ul>
			</nav>
		</>
	);
};

export default AdminNavigation;
