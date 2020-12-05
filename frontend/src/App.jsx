import React, { useContext } from "react";
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from "react-router-dom";

import { I18Provider } from "./i18n";
import Exercises from "./client/pages/Exercises/Exercises";
import Home from "./client/pages/Home/Home";
import Header from "./client/components/Header/Header";

import GlobalContext from "./context/globalContext/global-context";

const App = () => {
	const { locale } = useContext(GlobalContext);

	return (
		<I18Provider locale={locale}>
			<Router>
				<Header />
				<main>
					<Switch>
						<Route path="/" component={Home} exact />
						<Route path="/exercises" component={Exercises} exact />
						<Redirect to="/" />
					</Switch>
				</main>
			</Router>
		</I18Provider>
	);
};

export default App;
