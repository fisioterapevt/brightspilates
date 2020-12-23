import React from "react";
import { Link } from "react-router-dom";
import Level from "../Level/Level";
import Rating from "../Rating/Rating";
import { ReactComponent as TimeIcon } from "../../../assets/svg/time-icon.svg";
import ReadMore from "../UIElements/ReadMore/ReadMore";

import classes from "./Card.module.scss";

const Card = ({ video }) => {
	return (
		<section className={classes.Card}>
			<Link to="/">
				<img src="" alt="" />
			</Link>
			<div className={classes.duration}>
				<TimeIcon />
				<span className={classes.time}>13:34</span>
			</div>
			<div className={classes.info}>
				<h3>Title</h3>
				<div className={classes.details}>
					<span>props</span>
					<Level level="intermediate" />
					<Rating value={3.7} />
					{/*<span>reviews</span>*/}
				</div>
				<div className={classes.description}>
					<ReadMore>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque cum
						voluptatem unde veritatis doloremque voluptas, aut omnis iure,
						dolorem quis libero. Asperiores est id in expedita harum earum ex
						modi! Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Similique iure, praesentium consectetur asperiores alias dolorum
						possimus, cumque sunt et voluptatem libero. Ipsa, excepturi
						obcaecati! Quisquam nostrum fugit ratione vero aliquam! Lorem
						ipsum dolor sit amet consectetur adipisicing elit. Natus sunt quo
						labore! Quis similique dignissimos perspiciatis tempore veniam
						dolor, rerum enim tenetur ipsam dolores vero iste aliquid id harum
						est?
					</ReadMore>
				</div>
			</div>
		</section>
	);
};

export default Card;
