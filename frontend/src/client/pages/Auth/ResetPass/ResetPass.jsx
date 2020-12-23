import React, { useState, useContext, useEffect } from "react";

import translate from "../../../../i18n/translate";
import GlobalContext from "../../../../context/globalContext/global-context";
import Button from "../../../components/UIElements/Button/Button";
import Loader from "../../../components/UIElements/Loader/Loader";
import HttpError from "../../../components/UIElements/HttpError/HttpError";
import Input from "../../../components/UIElements/Input/Input";

import classes from "./ResetPass.module.scss";

const ResetPass = ({ history }) => {
	const {
		resetPassword,
		resetErrors,
		httpError,
		loading,
		locale,
		message,
	} = useContext(GlobalContext);

	const [email, setEmail] = useState("");

	useEffect(() => {
		resetErrors();
	}, [resetErrors]);

	const submitHandler = (evt) => {
		evt.preventDefault();
		resetPassword(email, history, locale);
	};
	return (
		<section className={classes.ResetPass}>
			<div className={classes.formReset}>
				{loading && <Loader />}
				{httpError && <HttpError>{translate(httpError, {})}</HttpError>}
				{message ? (
					<div className={classes.successMessage}>
						<h2>Успешно!</h2>
						<h3>{message}</h3>
					</div>
				) : (
					<>
						<h1>Забыли пароль?</h1>
						<form action="/auth/password/reset" onSubmit={submitHandler}>
							<Input
								externalStyles={classes.resetInput}
								id="email"
								type="email"
								placeholder=" Введите Email"
								onChange={(evt) => setEmail(evt.target.value)}
								required
							/>
							<Button externalStyles={classes.resetButton} type="submit">
								Сбросить
							</Button>
						</form>
					</>
				)}
			</div>
		</section>
	);
};

export default ResetPass;
