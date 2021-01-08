import React, { useContext, useEffect, useState } from "react";
import Moment from "react-moment";
import "moment/locale/ru";

import Button from "../../components/UIElements/Button/Button";
import UserContext from "../../../context/userContext/user-context";

import Input from "../../components/UIElements/Input/Input";
import translate from "../../../i18n/translate";
import { ReactComponent as EditIcon } from "../../../assets/svg/edit_blue-icon.svg";

import classes from "./EditProfile.module.scss";
import GoBackButton from "../../components/UIElements/GoBackButton/GoBackButton";
import HttpError from "../../components/UIElements/HttpError/HttpError";
import ImageUpload from "../../components/UIElements/ImageUpload/ImageUpload";

const EditProfile = ({ history }) => {
	const {
		userLogin,
		locale,
		updateUserProfile,
		//updateAvatar,
		resetErrors,
		httpError,
	} = useContext(UserContext);

	const { userInfo } = userLogin;

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [currentImage, setCurrentImage] = useState("");
	const [previewImage, setPreviewImage] = useState();
	const [file, setFile] = useState();

	const [date, setDate] = useState("unknown");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState(null);

	const [changePassword, setChangePassword] = useState(false);
	const [changeName, setChangeName] = useState(false);

	useEffect(() => {
		if (!userInfo) {
			history.push("/login");
		} else {
			setName(userInfo.name);
			setEmail(userInfo.email);
			setCurrentImage(userInfo.image);
			setDate(userInfo.created);
		}
	}, [history, userInfo]);

	const submitHandler = (evt) => {
		evt.preventDefault();

		if (password !== confirmPassword) {
			setMessage("Passwords do not match");
		} else {
			updateUserProfile({
				id: userInfo._id,
				name,
				email,
				password,
				image: file,
			});

			setChangeName(false);
			setChangePassword(false);
			setPreviewImage(null);
		}
	};

	const cancelChangeHandler = () => {
		setChangeName(false);
		setChangePassword(false);
		setPreviewImage(null);
		setMessage("");
		resetErrors();
	};

	return (
		<section className={classes.EditProfile}>
			<div className={classes.header}>
				<h1>{translate("edit profile")}</h1>
			</div>
			<div className={classes.innerContent}>
				<GoBackButton to={"/profile"} onClick={cancelChangeHandler} />
				<h1>{message}</h1>
				{httpError && <HttpError>{httpError}</HttpError>}
				<div className={classes.bio}>
					<div className={classes.bioUsername}>
						<h3>{userInfo.name}</h3>
					</div>
					<form onSubmit={submitHandler} action="submit">
						<ImageUpload
							id="image"
							imageUrl={currentImage}
							previewUrl={previewImage}
							setPreviewUrl={setPreviewImage}
							setFile={setFile}
							file={file}
						/>
						<button
							type="button"
							className={classes.button}
							onClick={() => setChangeName((prevState) => !prevState)}
						>
							{translate(`Change name`)}
						</button>
						{changeName && (
							<Input
								id="name"
								type="text"
								value={name}
								label={translate(`username`)}
								errorText="Please enter a valid password, at least 5 characters."
								externalStyles={classes.bioInput}
								onChange={(evt) => setName(evt.target.value)}
							/>
						)}
						<button
							type="button"
							className={classes.button}
							onClick={() => setChangePassword((prevState) => !prevState)}
						>
							{translate(`Change password`)}
						</button>
						{changePassword && (
							<>
								<Input
									elementType="password"
									id="password"
									type="password"
									value={password}
									label={translate(`userpassword`)}
									errorText="Please enter a valid password, at least 5 characters."
									externalStyles={classes.bioInput}
									onChange={(evt) => setPassword(evt.target.value)}
								/>
								<Input
									elementType="password"
									id="confirmPassword"
									type="password"
									value={confirmPassword}
									label={translate(`confirmpassword`, {})}
									errorText="Please enter a valid password, at least 5 characters."
									externalStyles={classes.bioInput}
									onChange={(evt) => setConfirmPassword(evt.target.value)}
								/>
							</>
						)}
						{(previewImage || changePassword || changeName) && (
							<div className={classes.buttonBlock}>
								<Button type="submit">{translate(`Update`)}</Button>
								<Button type="button" onClick={cancelChangeHandler}>
									{translate(`Cancel`)}
								</Button>
							</div>
						)}
					</form>
					<p>
						{translate(`Account created on`, { email })}
						<Moment locale={locale} fromNow date={new Date(date)} />
					</p>
				</div>
			</div>
		</section>
	);
};

export default EditProfile;
