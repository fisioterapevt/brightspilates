import React, { useContext } from "react";

import UserContext from "../../../../context/userContext/user-context";
import classes from "./NavLinks.module.scss";
import translate from "../../../../i18n/translate";
import NavigationLink from "./NavLink/NavLink";

import { mainLinks } from "../../../data/links.json";

const NavLinks = ({ externalStyles, onClick }) => {
	const { userLogin } = useContext(UserContext);
	const { userInfo } = userLogin;

	return (
		<ul className={[classes.NavigationItems, externalStyles].join(" ")}>
			{mainLinks.map((route) => {
				return (
					<NavigationLink
						key={route.id}
						link={route.link}
						exact={route.exact}
						onClick={onClick}
					>
						{translate(route.name)}
					</NavigationLink>
				);
			})}
			{!userInfo && (
				<NavigationLink link="/auth" onClick={onClick}>
					{translate(`signin`, {})}
				</NavigationLink>
			)}
		</ul>
	);
};

export default NavLinks;
