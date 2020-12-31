import React, { useContext, useEffect, useState } from "react";
import Moment from "react-moment";
import "moment/locale/ru";

import UserContext from "../../../context/userContext/user-context";
import OrderContext from "../../../context/orderContext/order-context";

import translate from "../../../i18n/translate";
import { ReactComponent as UploadIcon } from "../../../assets/svg/upload_picture-icon.svg";
import purchases from "../../data/purchases.json";

import classes from "./Profile.module.scss";
import { Link } from "react-router-dom";
import TabNav from "../../components/Tabs/TabNav/TabNav";
import Tab from "../../components/Tabs/Tab/Tab";
import Plans from "../../components/Plans/Plans";
import OrderList from "../../components/OrderList/OrderList";
import Loader from "../../components/UIElements/Loader/Loader";
import HttpError from "../../components/UIElements/HttpError/HttpError";

const tabs = [
	{ id: "currentTab", name: "current" },
	{ id: "subscriptionTab", name: "subscription" },
	{ id: "groupsTab", name: "groups" },
	{ id: "personalTab", name: "personal" },
];

const Profile = ({ history }) => {
	const { userLogin, locale, updateAvatar, checkTokenIsValid } = useContext(
		UserContext
	);
	const {
		order,
		orders,
		createOrder,
		deleteOrder,
		getOrderList,
		//loading,
		getListLoading,
		success,
		successDelete,
		httpError,
	} = useContext(OrderContext);

	const { userInfo } = userLogin;

	const { subscription, groups, personal } = purchases;

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [image, setImage] = useState("");
	const [date, setDate] = useState("unknown");
	const [previewImage, setPreviewImage] = useState("");

	const [selectedTab, setSelectedTab] = useState("current");

	useEffect(() => {
		if (success) {
			history.push(`/profile/order/${order._id}/pay`);
		}

		if (!userInfo) {
			history.push("/login");
		} else {
			setName(userInfo.name);
			setEmail(userInfo.email);
			setImage(userInfo.image);
			setDate(userInfo.created);
			getOrderList(userInfo);
		}
	}, [
		history,
		userInfo,
		order,
		success,
		getOrderList,
		successDelete,
		checkTokenIsValid,
	]);

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

	//@ сохранение заказа в базе данных
	const placeOrderHandler = (purchase) => {
		createOrder(
			{
				orderName: purchase.name,
				orderFullName: purchase.fullName,
				orderPrice: purchase.price,
			},
			userInfo
		);
	};

	return (
		<section className={classes.Profile}>
			<div className={classes.header}>
				<h1>{translate("profile")}</h1>
			</div>
			<div className={classes.innerContent}>
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
					</div>
					<p className={classes.accountSince}>
						{translate(`Account created on`, { email })}
						<Moment locale={locale} fromNow date={new Date(date)} />
					</p>
					<Link className={classes.editProfileLink} to={"/profile/edit"}>
						{translate(`edit profile`)}
					</Link>

					<div id="paypal-button-container"></div>
				</div>

				<div className={classes.tabs}>
					<TabNav
						tabs={tabs}
						isSelectedTab={selectedTab}
						onSetActiveTabHandler={(tab) => setSelectedTab(tab)}
					>
						<Tab isSelected={selectedTab === "current"}>
							{getListLoading ? (
								<Loader />
							) : httpError ? (
								<HttpError>{httpError}</HttpError>
							) : (
								<OrderList
									orders={orders}
									deleteOrder={deleteOrder}
									userInfo={userInfo}
									history={history}
								/>
							)}
						</Tab>
						<Tab isSelected={selectedTab === "subscription"}>
							<Plans
								offers={subscription}
								addToPayHandler={placeOrderHandler}
							/>
						</Tab>
						<Tab isSelected={selectedTab === "groups"}>
							<Plans offers={groups} addToPayHandler={placeOrderHandler} />
						</Tab>
						<Tab isSelected={selectedTab === "personal"}>
							<Plans offers={personal} addToPayHandler={placeOrderHandler} />
						</Tab>
					</TabNav>
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

export default Profile;
