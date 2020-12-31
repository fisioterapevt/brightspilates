import React, { useContext, useEffect, useState } from "react";
import Moment from "react-moment";
import "moment/locale/ru";

import Button from "../../components/UIElements/Button/Button";
import UserContext from "../../../context/userContext/user-context";

import Input from "../../components/UIElements/Input/Input";
import translate from "../../../i18n/translate";
import { ReactComponent as UploadIcon } from "../../../assets/svg/upload_picture-icon.svg";
import { ReactComponent as EditIcon } from "../../../assets/svg/edit_blue-icon.svg";
//import plans from "../../data/plans.json";

import classes from "./EditProfile.module.scss";
import GoBackButton from "../../components/UIElements/GoBackButton/GoBackButton";

const EditProfile = ({ history }) => {
	const { userLogin, locale, updateUserProfile, updateAvatar } = useContext(
		UserContext
	);

	const { userInfo } = userLogin;

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [image, setImage] = useState("");
	const [date, setDate] = useState("unknown");
	const [previewImage, setPreviewImage] = useState("");

	const [password, setPassword] = useState("");

	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState(null);

	const [changePassword, setChangePassword] = useState(false);
	const [changeName, setChangeName] = useState(false);

	//console.log(plans);

	useEffect(() => {
		if (!userInfo) {
			history.push("/login");
		} else {
			setName(userInfo.name);
			setEmail(userInfo.email);
			setImage(userInfo.image);
			setDate(userInfo.created);
		}
	}, [history, userInfo]);

	//@ download avatar image
	const uploadFileHandler = (evt) => {
		const file = evt.target.files[0];

		if (file) {
			const reader = new FileReader();
			reader.onload = function (e) {
				setPreviewImage(e.target.result);
			};
			reader.readAsDataURL(file);

			updateAvatar("avatar", file);
		}
	};

	const submitHandler = (evt) => {
		evt.preventDefault();
		if (password !== confirmPassword) {
			setMessage("Passwords do not match");
		} else {
			updateUserProfile({ id: userInfo._id, name, email, password, image });
			setChangeName(false);
			setChangePassword(false);
			setPreviewImage("");
		}
	};

	const cancelChangeHandler = () => {
		setChangeName(false);
		setChangePassword(false);
		setPreviewImage("");
	};

	//const addToCartHandler = (evt) => {
	//	console.log(evt.target);
	//};

	return (
		<section className={classes.Profile}>
			<div className={classes.header}>
				<h1>{translate("edit profile")}</h1>
			</div>
			<div className={classes.innerContent}>
				<GoBackButton to={"/profile"} />
				<h1>{message}</h1>
				<div className={classes.bio}>
					<button className={classes.uploadButton}>
						<div className={classes.uploadImage}>
							<img src={previewImage || image} alt={name} />
							<label htmlFor="image-file">
								<UploadIcon />
							</label>
							<input
								id="image-file"
								type="file"
								onChange={uploadFileHandler}
								accept=".jpg, .jpeg, .png, .gif, .bmp"
							></input>
						</div>
					</button>

					<div className={classes.bioUsername}>
						<h3>{name}</h3>
						<button
							className={classes.bioButton}
							onClick={() => setChangeName((prevState) => !prevState)}
						>
							<EditIcon />
						</button>
					</div>
					<button
						className={classes.passButton}
						onClick={() => setChangePassword((prevState) => !prevState)}
					>
						{translate(`Change password`)}
					</button>
					<form onSubmit={submitHandler} encType="multipart/form-data">
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

				{/*<div className={classes.actionBlock}>
					<div className={classes.actions}>
						<button
							className={classes.userActionButton}
							onClick={addToCartHandler}
						>
							<h3>${plans.group_workout_min.price}</h3>
							<p>
								{plans.group_workout_min.qty}
								{translate(plans.group_workout_min.name)}
							</p>
						</button>
						<button
							className={classes.userActionButton}
							onClick={addToCartHandler}
						>
							<h3>80$</h3>
							<p> 10 групповых тренировок</p>
						</button>
					</div>
					<div className={classes.actions}>
						<button
							className={classes.userActionButton}
							onClick={addToCartHandler}
						>
							<h3>100$</h3>
							<p> 1 персональная тренировка</p>
						</button>
						<button
							className={classes.userActionButton}
							onClick={addToCartHandler}
						>
							<h3>450$</h3>
							<p> 5 персональных тренировок</p>
						</button>
						<button
							className={classes.userActionButton}
							onClick={addToCartHandler}
						>
							<h3>800$</h3>
							<p> 10 персональных тренировок</p>
						</button>
					</div>
					<div className={classes.actions}>
						<button
							className={classes.userActionButton}
							onClick={addToCartHandler}
						>
							<h3>10$</h3>
							<p>1 месяц подписки</p>
						</button>
						<button
							className={classes.userActionButton}
							onClick={addToCartHandler}
						>
							<h3>80$</h3>
							<p> 1 год подписки</p>
						</button>
					</div>
				</div>*/}
			</div>
		</section>
	);
};

export default EditProfile;
