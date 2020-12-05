import classes from "./MainNavigation.module.scss";
import React, { useState } from "react";
import NavLinks from "../NavLinks/NavLinks";
import Drawer from "../Drawer/Drawer";

const MainNavigation = () => {
	const [drawerIsOpen, setDrawerIsOpen] = useState(false);

	const openDrawerHandler = () => setDrawerIsOpen(true);
	const closeDrawerHandler = () => setDrawerIsOpen(false);

	return (
		<>
			<nav className={classes.mainNav}>
				<NavLinks />
			</nav>
			<Drawer show={drawerIsOpen} closeDrawerHandler={closeDrawerHandler}>
				<NavLinks
					externalStyles={classes.drawerNav}
					onClick={closeDrawerHandler}
				/>
			</Drawer>
			<button
				type="button"
				className={classes.menuButton}
				onClick={openDrawerHandler}
			></button>
		</>
	);
};

export default MainNavigation;
