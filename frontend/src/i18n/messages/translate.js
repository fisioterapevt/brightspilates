import React from "react";
import { FormattedMessage } from "react-intl";

const translate = (id, value = {}) => {
	//console.log(id);
	return <FormattedMessage id={id} values={{ ...value }} />;
};

export default translate;
