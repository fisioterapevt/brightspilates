import React, { useContext, useEffect, useState } from "react";
//import ReactDOM from "react-dom";

import axios from "axios";
//import { Link } from "react-router-dom";
//import { PayPalButton } from "react-paypal-button-v2";

import translate from "../../../i18n/translate";
import OrderContext from "../../../context/orderContext/order-context";
import UserContext from "../../../context/userContext/user-context";
import Button from "../../components/UIElements/Button/Button";

import classes from "./PlaceOrder.module.scss";
import Loader from "../../components/UIElements/Loader/Loader";
import PayPalButton from "../../components/UIElements/Button/PayPalButton/PayPalButton";

const PlaceOrder = ({ match, history }) => {
	const orderId = match.params.id;

	const [pending, setPending] = useState(false);

	const { order, deleteOrder, payOrder, loading, successPay } = useContext(
		OrderContext
	);
	const { userLogin } = useContext(UserContext);
	const { userInfo } = userLogin;

	const [sdkReady, setSdkReady] = useState(false);

	useEffect(() => {
		if (!userInfo) {
			history.push("/login");
		}
		if (!order || order.isPaid) {
			history.push("/profile");
		}

		const addPayPalScript = async () => {
			const { data: clientId } = await axios.get("/api/config/paypal");

			const script = document.createElement("script");
			script.type = "text/javascript";
			script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;

			script.async = true;

			script.onload = () => {
				setSdkReady(true);
			};
			document.body.appendChild(script);
		};

		if (!order || order._id !== orderId) {
			//dispatch({ type: actionTypes.ORDER_PAY_RESET });
			//dispatch({ type: actionTypes.ORDER_DELIVER_RESET });
			//dispatch(getOrderDetails(orderId));
		} else if (!order.isPaid) {
			if (!window.paypal) {
				addPayPalScript();
			} else {
				setSdkReady(true);
			}
		}
	}, [history, userInfo, order, orderId, successPay]);

	const removeOrderFromPayment = () => {
		deleteOrder(order._id, userInfo);
	};

	const successPaymentHandler = (paymentResult) => {
		payOrder(orderId, paymentResult, userInfo);
	};

	//console.log("loading: ", loading);

	console.log("pending ", pending);

	return (
		<div className={classes.PlaceOrder}>
			{pending && <Loader />}
			<div className={classes.header}>
				<h1>{translate("proceed_to_checkout")}</h1>
			</div>
			<div className={classes.orderSummary}>
				{loading && <Loader />}
				{order && (
					<section className={classes.infoBlock}>
						<h2>{translate(order.fullName)}</h2>
						<div className={classes.payment}>
							<h3>{translate("payment")}</h3>
							<h4 className={order.isPaid ? classes.paid : classes.notPaid}>
								{order.isPaid ? translate("paid") : translate("not_paid")}
							</h4>
						</div>
						<div>Price ${order.price}</div>
						<div className={classes.buttonBlock}>
							<Button onClick={removeOrderFromPayment}>ОТМЕНИТЬ</Button>
						</div>
					</section>
				)}
				<section className={classes.paymentMethod}>
					{order && !order.isPaid && (
						<section className={classes.payBlock}>
							{!sdkReady ? (
								<Loader />
							) : (
								<PayPalButton
									amount={order.price}
									description={order.name}
									onSuccess={successPaymentHandler}
									pendingPayment={setPending}
								/>
							)}
						</section>
					)}
				</section>
			</div>
		</div>
	);
};

export default PlaceOrder;
