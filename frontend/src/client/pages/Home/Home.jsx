import React from "react";

import classes from "./Home.module.scss";
import translate from "../../../i18n/messages/translate";
import NotFound from "../../components/NotFound/NotFound";

const Home = () => {
	return (
		<div className={classes.Home}>
			<h2 className={classes.headline}>{translate(`home`, {})}</h2>
			<NotFound />
		</div>
	);
};

export default Home;
