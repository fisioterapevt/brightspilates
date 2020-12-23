import React, { useState, useContext } from "react";

import translate from "../../../../../i18n/translate";
import Button from "../../../../components/UIElements/Button/Button";
import Input from "../../../../components/UIElements/Input/Input";
import GlobalContext from "../../../../../context/globalContext/global-context";
import HttpError from "../../../../components/UIElements/HttpError/HttpError";

import classes from "./NewPass.module.scss";
import Loader from "../../../../components/UIElements/Loader/Loader";

const NewPass = ({ history, match }) => {
	const { setNewPassword, message, httpError, loading } = useContext(
		GlobalContext
	);

	if (!match.params.token) {
		history.push("/login");
	}

	const token = match.params.token;

	const [password, setPassword] = useState("");

	const submitHandler = (evt) => {
		evt.preventDefault();
		setNewPassword(password, token, history);
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
						<h1>Задать новый пароль</h1>
						<form action="/auth/new/password" onSubmit={submitHandler}>
							<Input
								externalStyles={classes.resetInput}
								id="password"
								type="password"
								placeholder="Введите новый пароль"
								onChange={(evt) => setPassword(evt.target.value)}
								required
							/>
							<Button externalStyles={classes.resetButton} type="submit">
								Сохранить новый пароль
							</Button>
						</form>
					</>
				)}
			</div>
		</section>
	);
};

export default NewPass;
