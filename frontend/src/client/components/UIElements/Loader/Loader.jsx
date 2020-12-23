import React from "react";

import "./Loader.css";

const Loader = () => {
	return (
		<>
			<div className="back-drop"></div>
			<div className="blocks">
				<div className="block orange"></div>
				<div className="block blue"></div>
			</div>
		</>
	);
};

export default Loader;
