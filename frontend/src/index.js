import React from "react";
import ReactDOM from "react-dom";

import "./index.scss";
import { GlobalState } from "./context/globalContext/GlobalState";
import { VideoState } from "./context/videoContext/VideoState";

import App from "./App";

ReactDOM.render(
	<GlobalState>
		<VideoState>
			<App />
		</VideoState>
	</GlobalState>,
	document.getElementById("root")
);
