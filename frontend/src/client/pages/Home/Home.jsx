import React from "react";

import translate from "../../../i18n/translate";
import Card from "../../components/Card/Card";
import NotFound from "../../components/UIElements/NotFound/NotFound";

import classes from "./Home.module.scss";

const Home = () => {
	console.log(localStorage.getItem("userInfo"));
	return (
		<section className={classes.Home}>
			<h2 className={classes.headline}>{translate(`home`, {})}</h2>
			<Card />
			<NotFound />
		</section>
	);
};

export default Home;
