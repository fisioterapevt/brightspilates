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
import Auth from "./client/pages/Auth/Auth";
import Profile from "./client/pages/Profile/Profile";
import UserList from "./admin/pages/UserList/UserList";
import VideoList from "./admin/pages/VideoList/VideoList";
import VideoEdit from "./admin/pages/VideoEdit/VideoEdit";
import ResetPass from "./client/pages/Auth/ResetPass/ResetPass";
import Header from "./client/components/Header/Header";

import GlobalContext from "./context/globalContext/global-context";
import NewPass from "./client/pages/Auth/ResetPass/NewPass/NewPass";

const App = () => {
	const { locale, userLogin } = useContext(GlobalContext);
	const { userInfo } = userLogin;

	return (
		<I18Provider locale={locale}>
			<Router>
				<Header userLogin={userLogin} />
				<main>
					<Switch>
						<Route path="/profile" component={Profile} />
						<Route path="/auth" component={Auth} exact />
						<Route path="/auth/password/reset" component={ResetPass} />
						<Route path="/auth/new/password/:token" component={NewPass} />

						<Route path="/exercises" component={Exercises} />
						<Route path="/" component={Home} exact />

						{userInfo && userInfo.isAdmin && (
							<>
								<Route path="/admin/userlist" component={UserList} />
								<Route path="/admin/videolist" component={VideoList} />
								<Route path="/admin/video/:id/edit" component={VideoEdit} />
							</>
						)}
						<Redirect to="/" />
					</Switch>
				</main>
			</Router>
		</I18Provider>
	);
};

export default App;
