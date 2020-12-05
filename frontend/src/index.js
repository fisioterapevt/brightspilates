import React from "react";
import ReactDOM from "react-dom";

import "./index.scss";
import { GlobalState } from "./context/globalContext/GlobalState";

import App from "./App";

ReactDOM.render(
	<GlobalState>
		<App />
	</GlobalState>,
	document.getElementById("root")
);
