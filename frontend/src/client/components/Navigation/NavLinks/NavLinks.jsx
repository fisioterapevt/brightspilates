import React from "react";

import classes from "./NavLinks.module.scss";
import translate from "../../../../i18n/messages/translate";
import NavigationLink from "./NavLink/NavLink";

import { mainLinks } from "../../../data/links.json";

const NavLinks = ({ externalStyles, onClick }) => {
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
		</ul>
	);
};

export default NavLinks;
