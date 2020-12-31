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

import UserContext from "./context/userContext/user-context";
import NewPass from "./client/pages/Auth/ResetPass/NewPass/NewPass";
import EditProfile from "./client/pages/EditProfile/EditProfile";
import PlaceOrder from "./client/pages/PlaceOrder/PlaceOrder";

const App = () => {
	const { locale, userLogin, logout } = useContext(UserContext);
	const { userInfo } = userLogin;

	let routes = (
		<Switch>
			<Route path="/auth" component={Auth} exact />
			<Route path="/auth/password/reset" component={ResetPass} />
			<Route path="/exercises" component={Exercises} />
			<Route path="/" component={Home} exact />
			<Redirect to="/" />
		</Switch>
	);

	if (userInfo) {
		routes = (
			<Switch>
				<Route path="/profile" component={Profile} exact />
				<Route path="/profile/edit" component={EditProfile} exact />
				<Route path="/profile/order/:id" component={PlaceOrder} exact />
				<Route path="/auth" component={Auth} exact />
				<Route path="/auth/new/password/:token" component={NewPass} />
				<Route path="/exercises" component={Exercises} />
				<Route path="/" component={Home} exact />
				<Redirect to="/" />
			</Switch>
		);
	}

	if (userInfo && userInfo.isAdmin) {
		routes = (
			<Switch>
				<Route path="/auth" component={Auth} exact />
				<Route path="/auth/password/reset" component={ResetPass} />
				<Route path="/exercises" component={Exercises} />
				<Route path="/profile" component={Profile} exact />
				<Route path="/profile/edit" component={EditProfile} exact />
				<Route path="/profile/order/:id/pay" component={PlaceOrder} exact />
				<Route path="/admin/userlist" component={UserList} />
				<Route path="/admin/videolist" component={VideoList} />
				<Route path="/admin/video/:id/edit" component={VideoEdit} />
				<Route path="/" component={Home} exact />
				<Redirect to="/" />
			</Switch>
		);
	}

	return (
		<I18Provider locale={locale}>
			<Router>
				<Header userLogin={userLogin} logout={logout} />
				<main>{routes}</main>
			</Router>
		</I18Provider>
	);
};

export default App;
