import React, { useState } from "react";
import { Link } from "react-router-dom";

import translate from "../../../i18n/translate";
import { ReactComponent as Logo } from "../../../assets/svg/logo.svg";
import { ReactComponent as User } from "../../../assets/svg/icon-user.svg";
import LangToggle from "../UIElements/LangToggle/LangToggle";
import MainNavigation from "../Navigation/MainNavigation/MainNavigation";
import DropdownMenu from "../Navigation/DropdownMenu/DropdownMenu";
import UserNavigation from "../Navigation/UserNavigation/UserNavigation";
import AdminNavigation from "../Navigation/AdminNavigation/AdminNavigation";
import Button from "../UIElements/Button/Button";

import classes from "./Header.module.scss";

const Header = ({ userLogin, logout }) => {
	const { userInfo } = userLogin;
	const [isVisible, setIsVisible] = useState(false);

	const logoutHandler = () => {
		logout();
		setIsVisible(false);
	};

	//useEffect(() => {
	//	if (userInfo && new Date() >= new Date(userInfo.expToken * 1000)) {
	//		logout();
	//	}
	//}, [userInfo, logout]);

	return (
		<header className={classes.Header}>
			<Link to="/">
				<Logo className={classes.logo} />
			</Link>
			<div className={classes.navWrap}>
				<MainNavigation logoutHandler={logoutHandler} userInfo={userInfo} />
				{userInfo && (
					<>
						<span className={classes.username}>{userInfo.name}</span>
						<User
							className={classes.userIcon}
							onMouseEnter={() => setIsVisible(true)}
							onMouseLeave={() => setIsVisible(false)}
						/>
						<DropdownMenu
							show={isVisible}
							onMouseEnter={() => setIsVisible(true)}
							onMouseLeave={() => setIsVisible(false)}
						>
							<UserNavigation />
							{/*//@Admin panel*/}
							{userInfo.isAdmin && <AdminNavigation />}
							<Button onClick={logoutHandler}>{translate(`logout`)}</Button>
						</DropdownMenu>
					</>
				)}
			</div>
			<LangToggle externalStyles={classes.langToggle} />
		</header>
	);
};

export default Header;
