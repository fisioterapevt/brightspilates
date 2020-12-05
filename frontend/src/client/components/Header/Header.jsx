import React from "react";
import { Link } from "react-router-dom";

import classes from "./Header.module.scss";
import { ReactComponent as Logo } from "../../../assets/svg/logo.svg";
import LangToggle from "../../UIcomponents/LangToggle/LangToggle";
import MainNavigation from "../Navigation/MainNavigation/MainNavigation";

const Header = () => {
	return (
		<header className={classes.Header}>
			<Link to="/">
				<Logo className={classes.logo} />
			</Link>
			<MainNavigation />
			<LangToggle externalStyles={classes.langToggle} />
		</header>
	);
};

export default Header;
