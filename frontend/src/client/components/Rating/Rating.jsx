import React from "react";
import PropTypes from "prop-types";

import { ReactComponent as StarIcon } from "../../../assets/svg/empty_star-icon.svg";
import { ReactComponent as FullStarIcon } from "../../../assets/svg/full_star-icon.svg";
import { ReactComponent as HalfStarIcon } from "../../../assets/svg/half_star-icon.svg";

import classes from "./Rating.module.scss";

const Rating = ({ value, text, color }) => {
	return (
		<div className={classes.Rating}>
			<span>
				{value >= 1 ? (
					<FullStarIcon fill={color} />
				) : value >= 0.5 ? (
					<HalfStarIcon fill={color} />
				) : (
					<StarIcon fill={color} />
				)}
				{value >= 2 ? (
					<FullStarIcon fill={color} />
				) : value >= 1.5 ? (
					<HalfStarIcon fill={color} />
				) : (
					<StarIcon fill={color} />
				)}
				{value >= 3 ? (
					<FullStarIcon fill={color} />
				) : value >= 2.5 ? (
					<HalfStarIcon fill={color} />
				) : (
					<StarIcon fill={color} />
				)}
				{value >= 4 ? (
					<FullStarIcon fill={color} />
				) : value >= 3.5 ? (
					<HalfStarIcon fill={color} />
				) : (
					<StarIcon fill={color} />
				)}
				{value >= 4.8 ? (
					<FullStarIcon fill={color} />
				) : value >= 4.5 ? (
					<HalfStarIcon fill={color} />
				) : (
					<StarIcon fill={color} />
				)}
			</span>
			{/*<span>{text && text}</span>*/}
		</div>
	);
};

Rating.defaultProps = {
	color: "gold",
	value: 0,
	text: "",
};

Rating.propTypes = {
	text: PropTypes.string.isRequired,
	value: PropTypes.number.isRequired,
	color: PropTypes.string,
};

export default Rating;
