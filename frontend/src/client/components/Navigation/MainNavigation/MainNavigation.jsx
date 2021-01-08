import classes from "./MainNavigation.module.scss";
import React, { useState } from "react";
import NavLinks from "../NavLinks/NavLinks";
import Drawer from "../Drawer/Drawer";
import Button from "../../UIElements/Button/Button";
import translate from "../../../../i18n/translate";
import UserNavigation from "../UserNavigation/UserNavigation";

const MainNavigation = ({ logoutHandler, userInfo }) => {
	const [drawerIsOpen, setDrawerIsOpen] = useState(false);

	const openDrawerHandler = () => setDrawerIsOpen(true);
	const closeDrawerHandler = () => setDrawerIsOpen(false);

	return (
		<>
			<nav className={classes.mainNav}>
				<NavLinks />
			</nav>
			<Drawer
				show={drawerIsOpen}
				closeDrawerHandler={closeDrawerHandler}
				logoutHandler={logoutHandler}
			>
				<NavLinks
					externalStyles={classes.drawerNav}
					onClick={closeDrawerHandler}
				/>

				{userInfo && (
					<div>
						<UserNavigation onClick={closeDrawerHandler} />
						<Button onClick={logoutHandler}>{translate(`logout`)}</Button>
					</div>
				)}
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
