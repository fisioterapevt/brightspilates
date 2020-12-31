import React from "react";
import ReactDOM from "react-dom";

import "./index.scss";
import { UserState } from "./context/userContext/UserState";
//import { VideoState } from "./context/videoContext/VideoState";
import { OrderState } from "./context/orderContext/OrderState";

import App from "./App";

ReactDOM.render(
	<UserState>
		<OrderState>
			{/*<VideoState>*/}
			<App />
			{/*</VideoState>*/}
		</OrderState>
	</UserState>,
	document.getElementById("root")
);
