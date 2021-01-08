import React, { useState } from "react";
import { Link } from "react-router-dom";

import translate from "../../../i18n/translate";
import { ReactComponent as Logo } from "../../../assets/svg/logo.svg";
import LangToggle from "../UIElements/LangToggle/LangToggle";
import MainNavigation from "../Navigation/MainNavigation/MainNavigation";
import DropdownMenu from "../Navigation/DropdownMenu/DropdownMenu";
import UserNavigation from "../Navigation/UserNavigation/UserNavigation";
import AdminNavigation from "../Navigation/AdminNavigation/AdminNavigation";
import Button from "../UIElements/Button/Button";

import classes from "./Footer.module.scss";

const Footer = () => {
	const [isVisible, setIsVisible] = useState(false);

	const logoutHandler = () => {
		setIsVisible(false);
	};

	//useEffect(() => {
	//	if (userInfo && new Date() >= new Date(userInfo.expToken * 1000)) {
	//		logout();
	//	}
	//}, [userInfo, logout]);

	return (
		<footer className={classes.Footer}>
			<Link to="/">
				<Logo className={classes.logo} />
			</Link>
			<LangToggle externalStyles={classes.langToggle} />
		</footer>
	);
};

export default Footer;
