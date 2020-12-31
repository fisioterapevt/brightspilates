import React from "react";
import ReactDOM from "react-dom";

const PayPalButton = ({ amount, description, onSuccess, pendingPayment }) => {
	const PayPalReact = window.paypal.Buttons.driver("react", {
		React,
		ReactDOM,
	});

	const createOrder = (data, actions) => {
		return actions.order.create({
			intent: "CAPTURE",
			purchase_units: [
				{
					description: description,
					amount: {
						currency_code: "USD",
						value: amount,
					},
				},
			],
		});
	};

	const onApprove = async (data, actions) => {
		pendingPayment(true);

		const order = await actions.order.capture();

		pendingPayment(false);

		return onSuccess(order);
	};
	//? доделать
	//const onError = (error) => {
	//	console.log(error);
	//};

	return (
		<PayPalReact
			createOrder={(data, actions) => createOrder(data, actions)}
			onApprove={(data, actions) => onApprove(data, actions)}
		/>
	);
};

export default PayPalButton;
