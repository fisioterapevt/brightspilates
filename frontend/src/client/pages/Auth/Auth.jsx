import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import translate from "../../../i18n/translate";
import GlobalContext from "../../../context/globalContext/global-context";
import Button from "../../components/UIElements/Button/Button";
import Input from "../../components/UIElements/Input/Input";
import classes from "./Auth.module.scss";
import HttpError from "../../components/UIElements/HttpError/HttpError";
import Loader from "../../components/UIElements/Loader/Loader";

const Auth = ({ location, history }) => {
	const [isLoginMode, setIsLoginMode] = useState(true);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const {
		userLogin,
		login,
		registerUser,
		loading,
		httpError,
		locale,
		resetErrors,
	} = useContext(GlobalContext);
	const { userInfo } = userLogin;

	const redirect = location.search
		? location.search.split("=")[1]
		: "/profile";

	useEffect(() => {
		resetErrors();

		if (userInfo) {
			history.push(redirect);
		}
	}, [history, userInfo, redirect, resetErrors, isLoginMode]);

	const authSubmitHandler = (evt) => {
		evt.preventDefault();

		if (isLoginMode) {
			login(email, password);
		} else {
			registerUser(name, email, password, locale);
		}
	};

	const switchModeHandler = () => {
		//if (!isLoginMode) {
		//	setFormData(
		//		{ ...formState.inputs, name: undefined },
		//		formState.inputs.email.isValid && formState.inputs.password.isValid
		//	);
		//} else {
		//	setFormData(
		//		{
		//			...formState.inputs,
		//			name: {
		//				value: "",
		//				isValid: false,
		//			},
		//		},
		//		false
		//	);
		//}

		setIsLoginMode((prevMode) => !prevMode);
	};

	return (
		<section className={classes.Auth}>
			<h1>
				{isLoginMode ? translate(`signin`, {}) : translate(`signup`, {})}
			</h1>
			{loading && <Loader />}
			<form onSubmit={authSubmitHandler}>
				{httpError && (
					<HttpError>
						<p>{translate(httpError, {})}</p>
					</HttpError>
				)}
				{!isLoginMode && (
					<Input
						id="name"
						type="text"
						label={translate(`username`, {})}
						errorText="Please enter a valid name address."
						externalStyles={classes.input}
						onChange={(evt) => setName(evt.target.value)}
					/>
				)}
				<Input
					id="email"
					type="email"
					value={email}
					label={translate(`useremail`, {})}
					errorText="Please enter a valid email address."
					externalStyles={classes.input}
					onChange={(evt) => setEmail(evt.target.value)}
				/>

				<Input
					id="password"
					elementType="password"
					type="password"
					value={password}
					label={translate(`userpassword`, {})}
					errorText="Please enter a valid password, at least 5 characters."
					externalStyles={classes.input}
					onChange={(evt) => setPassword(evt.target.value)}
				/>

				<Button type="submit" externalStyles={classes.authSubmitButton}>
					{isLoginMode
						? translate(`signinBtn`, {})
						: translate(`signupBtn`, {})}
				</Button>
			</form>
			{isLoginMode && (
				<p>
					<Link className={classes.forgotPass} to={"/auth/password/reset"}>
						{translate(`forgot password`, {})}
					</Link>
				</p>
			)}
			<div className={classes.signupPrompt}>
				<p>
					{isLoginMode
						? translate(`notAccount`, {})
						: translate(`have an account`, {})}
				</p>
				<button
					//href="/"
					type="button"
					onClick={switchModeHandler}
					className={classes.switchModeButton}
				>
					{isLoginMode
						? translate(`signupBtn`, {})
						: translate(`signinBtn`, {})}
				</button>
			</div>
		</section>
	);
};

export default Auth;
