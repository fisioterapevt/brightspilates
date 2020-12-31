import React, { useContext } from "react";

import UserContext from "../../../../context/userContext/user-context";
import classes from "./NavLinks.module.scss";
import translate from "../../../../i18n/translate";
import NavigationLink from "./NavLink/NavLink";

import { mainLinks } from "../../../data/links.json";
import OrderContext from "../../../../context/orderContext/order-context";

const NavLinks = ({ externalStyles, onClick }) => {
	const { userLogin, logout } = useContext(UserContext);
	const { resetOrderState } = useContext(OrderContext);
	const { userInfo } = userLogin;

	const logoutHandler = () => {
		logout();
		resetOrderState();
	};

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
			{userInfo ? (
				<>
					<button onClick={() => logoutHandler()}>
						Logout
						{/*{translate(`signin`, {})}*/}
					</button>
				</>
			) : (
				<NavigationLink link="/auth" onClick={onClick}>
					{translate(`signin`, {})}
				</NavigationLink>
			)}
		</ul>
	);
};

export default NavLinks;
