import React, { useState } from "react";
import { Link } from "react-router-dom";

import classes from "./Header.module.scss";
import { ReactComponent as Logo } from "../../../assets/svg/logo.svg";
import { ReactComponent as User } from "../../../assets/svg/icon-user.svg";
import LangToggle from "../UIElements/LangToggle/LangToggle";

import MainNavigation from "../Navigation/MainNavigation/MainNavigation";
import DropdownMenu from "../Navigation/DropdownMenu/DropdownMenu";
import UserNavigation from "../Navigation/UserNavigation/UserNavigation";
import AdminNavigation from "../Navigation/AdminNavigation/AdminNavigation";

const Header = ({ userLogin }) => {
	const { userInfo } = userLogin;

	const [isVisible, setIsVisible] = useState(false);

	//console.log(userInfo.name);

	return (
		<header className={classes.Header}>
			<Link to="/">
				<Logo className={classes.logo} />
			</Link>
			<div className={classes.navWrap}>
				<MainNavigation />
				{userInfo && (
					<>
						<span className={classes.username}>{userInfo.name}</span>
						<User
							className={classes.userIcon}
							onMouseEnter={() => setIsVisible(true)}
							onMouseLeave={() => setIsVisible(false)}
						/>
						{isVisible && (
							<DropdownMenu
								onMouseEnter={() => setIsVisible(true)}
								onMouseLeave={() => setIsVisible(false)}
							>
								<UserNavigation />
								{/*//@Admin panel*/}
								{userInfo.isAdmin && <AdminNavigation />}
							</DropdownMenu>
						)}
					</>
				)}
			</div>
			<LangToggle externalStyles={classes.langToggle} />
		</header>
	);
};

export default Header;
