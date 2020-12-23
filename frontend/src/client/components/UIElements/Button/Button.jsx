import React from "react";
import { Link } from "react-router-dom";

import classes from "./Button.module.scss";

const Button = ({
	href,
	to,
	type,
	onClick,
	disabled,
	inverse,
	exact,
	externalStyles,
	children,
}) => {
	const clsButton = [classes.Button, externalStyles];

	if (inverse) {
		clsButton.push(classes.inverse);
	}

	if (href) {
		return (
			<a className={clsButton.join(" ")} href={href}>
				{children}
			</a>
		);
	}
	if (to) {
		return (
			<Link to={to} exact={exact} className={clsButton.join(" ")}>
				{children}
			</Link>
		);
	}
	return (
		<button
			className={clsButton.join(" ")}
			type={type}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default Button;
